package inspect

import (
	"context"
	"fmt"
	"net/http"
	"net/url"

	"github.com/pkg/errors"
	"github.com/spf13/cobra"

	"github.com/kumahq/kuma/v3/app/kumactl/pkg/cmd"
	"github.com/kumahq/kuma/v3/app/kumactl/pkg/output"
	"github.com/kumahq/kuma/v3/app/kumactl/pkg/output/printers"
	"github.com/kumahq/kuma/v3/app/kumactl/pkg/resources"
	core_manager "github.com/kumahq/kuma/v3/pkg/core/resources/manager"
	diagnostics "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshidentity/diagnostics"
	util_http "github.com/kumahq/kuma/v3/pkg/util/http"
)

func newInspectIdentityMigrationCmd(pctx *cmd.RootContext) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "identity-migration",
		Short: "Inspect workload identity migration warnings",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, _ []string) error {
			report, err := runInspectIdentityMigration(cmd.Context(), pctx)
			if err != nil {
				return err
			}
			format := output.Format(pctx.InspectContext.Args.OutputFormat)
			return printers.GenericPrint(format, report.Issues, printers.Table{
				Headers: []string{"MESH", "CODE", "MESSAGE"},
				RowForItem: func(i int, container any) ([]string, error) {
					issues, ok := container.([]diagnostics.Issue)
					if !ok {
						return nil, errors.Errorf("unexpected container type %T", container)
					}
					if i >= len(issues) {
						return nil, nil
					}
					issue := issues[i]
					return []string{issue.Mesh, issue.Code, issue.Message}, nil
				},
			}, cmd.OutOrStdout())
		},
	}
	return cmd
}

func runInspectIdentityMigration(ctx context.Context, pctx *cmd.RootContext) (diagnostics.Report, error) {
	baseClient, err := pctx.BaseAPIServerClient()
	if err != nil {
		return diagnostics.Report{}, err
	}

	report, statusCode, err := resources.NewMeshIdentityReportClient(baseClient).GetReport(ctx)
	if err == nil {
		return report, nil
	}
	if statusCode != http.StatusNotFound {
		return diagnostics.Report{}, err
	}

	rs, err := pctx.CurrentResourceStore()
	if err != nil {
		return diagnostics.Report{}, err
	}
	analyzer := diagnostics.NewAnalyzer(core_manager.NewResourceManager(rs), &httpLegacyMeshSpecReader{client: baseClient}, "")
	return analyzer.Analyze(ctx)
}

type httpLegacyMeshSpecReader struct {
	client util_http.Client
}

func (h *httpLegacyMeshSpecReader) ReadRawMeshSpec(ctx context.Context, mesh string) ([]byte, error) {
	u, err := url.Parse(fmt.Sprintf("/meshes/%s", mesh))
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), http.NoBody)
	if err != nil {
		return nil, err
	}
	resp, err := h.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("(%d) unable to fetch mesh %q", resp.StatusCode, mesh)
	}
	return resources.ReadSpecFromResponse(resp)
}
