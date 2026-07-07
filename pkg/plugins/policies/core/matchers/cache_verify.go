package matchers

import (
	"fmt"
	"os"
	"slices"
	"sync/atomic"

	"github.com/kumahq/kuma/v3/pkg/core"
	core_mesh "github.com/kumahq/kuma/v3/pkg/core/resources/apis/mesh"
	core_model "github.com/kumahq/kuma/v3/pkg/core/resources/model"
	core_xds "github.com/kumahq/kuma/v3/pkg/core/xds"
	xds_context "github.com/kumahq/kuma/v3/pkg/xds/context"
)

var cacheVerifyLog = core.Log.WithName("policy-matching-cache-verify")

var cacheVerifyEnabled = func() bool {
	v, ok := os.LookupEnv("KUMA_XDS_SERVER_POLICY_MATCHING_CACHE_VERIFY")
	return ok && v == "true"
}()

var (
	cacheVerifyCount atomic.Int64
	cacheStaleCount  atomic.Int64
)

func verifyPolicyMatchingCache(
	rType core_model.ResourceType,
	dpp *core_mesh.DataplaneResource,
	resources xds_context.Resources,
	cached core_xds.TypedMatchingPolicies,
) {
	if !cacheVerifyEnabled {
		return
	}
	fresh, err := MatchedPolicies(rType, dpp, resources)
	if err != nil {
		cacheVerifyLog.Info("recompute failed", "type", rType, "error", err.Error())
		return
	}
	cachedFingerprint, freshFingerprint := matchedPoliciesFingerprint(cached), matchedPoliciesFingerprint(fresh)
	stale := cachedFingerprint != freshFingerprint
	if stale {
		cacheStaleCount.Add(1)
		cacheVerifyLog.Info("POLICY_MATCHING_CACHE_STALE",
			"type", rType,
			"mesh", dpp.GetMeta().GetMesh(),
			"dpp", dpp.GetMeta().GetName(),
			"dppVersion", dpp.GetMeta().GetVersion(),
			"cached", cachedFingerprint,
			"fresh", freshFingerprint,
		)
	}
	n := cacheVerifyCount.Add(1)
	if n == 1 || n%200 == 0 {
		cacheVerifyLog.Info("VERIFY_ACTIVE",
			"verifiedHits", n,
			"staleDetected", cacheStaleCount.Load(),
		)
	}
}

func matchedPoliciesFingerprint(p core_xds.TypedMatchingPolicies) string {
	ids := make([]string, 0, len(p.DataplanePolicies))
	for _, r := range p.DataplanePolicies {
		m := r.GetMeta()
		ids = append(ids, fmt.Sprintf("%s/%s@%s", m.GetMesh(), m.GetName(), m.GetVersion()))
	}
	slices.Sort(ids)
	fromInbound := 0
	for _, rs := range p.FromRules.Rules {
		fromInbound += len(rs)
	}
	return fmt.Sprintf(
		"dpp=%v fromKeys=%d fromRules=%d toRules=%d toRes=%d gwByL=%d gwByLH=%d single=%d warn=%d",
		ids,
		len(p.FromRules.Rules), fromInbound,
		len(p.ToRules.Rules), len(p.ToRules.ResourceRules),
		len(p.GatewayRules.ToRules.ByListener), len(p.GatewayRules.ToRules.ByListenerAndHostname),
		len(p.SingleItemRules.Rules), len(p.Warnings),
	)
}
