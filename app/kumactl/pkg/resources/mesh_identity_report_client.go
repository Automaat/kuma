package resources

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	diagnostics "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshidentity/diagnostics"
	util_http "github.com/kumahq/kuma/v3/pkg/util/http"
)

type MeshIdentityReportClient interface {
	GetReport(ctx context.Context) (diagnostics.Report, int, error)
}

func NewMeshIdentityReportClient(client util_http.Client) MeshIdentityReportClient {
	return &httpMeshIdentityReportClient{client: client}
}

type httpMeshIdentityReportClient struct {
	client util_http.Client
}

func (h *httpMeshIdentityReportClient) GetReport(ctx context.Context) (diagnostics.Report, int, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, "/mesh-identity-report", http.NoBody)
	if err != nil {
		return diagnostics.Report{}, 0, err
	}
	statusCode, body, err := doRequest(h.client, ctx, req)
	if err != nil {
		return diagnostics.Report{}, statusCode, err
	}
	if statusCode != http.StatusOK {
		return diagnostics.Report{}, statusCode, fmt.Errorf("(%d): %s", statusCode, string(body))
	}
	var report diagnostics.Report
	if err := json.Unmarshal(body, &report); err != nil {
		return diagnostics.Report{}, statusCode, err
	}
	return report, statusCode, nil
}
