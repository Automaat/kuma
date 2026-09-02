package diagnostics

import (
	"context"
	"fmt"
	"net"
	"slices"

	"github.com/kumahq/kuma/v3/pkg/core/resources/apis/mesh"
	meshidentity_api "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/v3/pkg/core/resources/manager"
	core_model "github.com/kumahq/kuma/v3/pkg/core/resources/model"
	"github.com/kumahq/kuma/v3/pkg/core/resources/registry"
	"github.com/kumahq/kuma/v3/pkg/plugins/policies/core/matchers"
	xds_context "github.com/kumahq/kuma/v3/pkg/xds/context"
	xds_server "github.com/kumahq/kuma/v3/pkg/xds/server"
)

const (
	IssueCodeMeshWithoutIdentity    = "mesh-without-workload-identity"
	IssueCodePolicyTargetRefWarning = "policy-targetref-warning"
)

type Analyzer struct {
	resManager         manager.ReadOnlyResourceManager
	rawMeshSpecReader  LegacyMeshSpecReader
	meshContextBuilder xds_context.MeshContextBuilder
}

func NewAnalyzer(resManager manager.ReadOnlyResourceManager, rawMeshSpecReader LegacyMeshSpecReader, zone string) *Analyzer {
	return &Analyzer{
		resManager:         resManager,
		rawMeshSpecReader:  rawMeshSpecReader,
		meshContextBuilder: xds_context.NewMeshContextBuilder(resManager, xds_server.MeshResourceTypes(), net.LookupIP, zone),
	}
}

func (a *Analyzer) Analyze(ctx context.Context) (Report, error) {
	meshes := &mesh.MeshResourceList{}
	if err := a.resManager.List(ctx, meshes); err != nil {
		return Report{}, err
	}

	report := Report{}
	seen := map[string]struct{}{}
	for _, meshRes := range meshes.Items {
		meshName := meshRes.GetMeta().GetName()
		if !a.meshHasLegacyMTLS(ctx, meshName) {
			continue
		}

		fullCtx, err := a.meshContextBuilder.Build(ctx, meshName)
		if err != nil {
			return Report{}, err
		}
		if meshNeedsIdentity(resourcesToItems(fullCtx.Resources.Dataplanes().Items), resourcesToItems(fullCtx.Resources.MeshIdentities().Items)) {
			a.addIssue(&report, seen, Issue{
				Code: IssueCodeMeshWithoutIdentity,
				Mesh: meshName,
				Message: fmt.Sprintf(
					"mesh %q still has legacy spec.mtls configured and its proxies have no workload identity; upgrading will cause an outage",
					meshName,
				),
			})
		}
		for _, warning := range a.policyWarnings(fullCtx.Resources) {
			a.addIssue(&report, seen, Issue{
				Code:    IssueCodePolicyTargetRefWarning,
				Mesh:    meshName,
				Message: warning,
			})
		}
	}

	slices.SortFunc(report.Issues, func(a, b Issue) int {
		switch {
		case a.Mesh < b.Mesh:
			return -1
		case a.Mesh > b.Mesh:
			return 1
		case a.Code < b.Code:
			return -1
		case a.Code > b.Code:
			return 1
		case a.Message < b.Message:
			return -1
		case a.Message > b.Message:
			return 1
		default:
			return 0
		}
	})
	return report, nil
}

func (a *Analyzer) meshHasLegacyMTLS(ctx context.Context, meshName string) bool {
	if a.rawMeshSpecReader == nil {
		return false
	}
	rawSpec, err := a.rawMeshSpecReader.ReadRawMeshSpec(ctx, meshName)
	return err == nil && HasLegacyMTLS(rawSpec)
}

func resourcesToItems[T core_model.Resource](items []T) []core_model.Resource {
	out := make([]core_model.Resource, 0, len(items))
	for _, item := range items {
		out = append(out, item)
	}
	return out
}

func meshNeedsIdentity(dataplanes []core_model.Resource, identities []core_model.Resource) bool {
	meshIdentities := make([]*meshidentity_api.MeshIdentityResource, 0, len(identities))
	for _, item := range identities {
		if mi, ok := item.(*meshidentity_api.MeshIdentityResource); ok {
			meshIdentities = append(meshIdentities, mi)
		}
	}
	for _, item := range dataplanes {
		dp, ok := item.(*mesh.DataplaneResource)
		if !ok {
			continue
		}
		identity, matched := meshidentity_api.BestMatched(dp.GetMeta().GetLabels(), meshIdentities)
		if !matched || identity.Status == nil || !identity.Status.IsInitialized() {
			return true
		}
	}
	return false
}

func (a *Analyzer) policyWarnings(resources xds_context.Resources) []string {
	var warnings []string
	for _, dp := range resources.Dataplanes().Items {
		for _, desc := range registry.Global().ObjectDescriptors(core_model.IsPolicy()) {
			if !desc.IsTargetRefBased {
				continue
			}
			matched, err := matchers.MatchedPolicies(desc.Name, dp, resources)
			if err != nil {
				continue
			}
			warnings = append(warnings, matched.Warnings...)
		}
	}
	return warnings
}

func (a *Analyzer) addIssue(report *Report, seen map[string]struct{}, issue Issue) {
	key := issue.Code + "\x00" + issue.Mesh + "\x00" + issue.Message
	if _, ok := seen[key]; ok {
		return
	}
	seen[key] = struct{}{}
	report.Issues = append(report.Issues, issue)
}
