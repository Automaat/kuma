package api_server

import (
	"net/http"

	"github.com/emicklei/go-restful/v3"

	diagnostics "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshidentity/diagnostics"
	"github.com/kumahq/kuma/v3/pkg/core/resources/manager"
	rest_errors "github.com/kumahq/kuma/v3/pkg/core/rest/errors"
)

func addMeshIdentityReportEndpoints(ws *restful.WebService, resManager manager.ReadOnlyResourceManager, rawReader diagnostics.LegacyMeshSpecReader, zone string) {
	analyzer := diagnostics.NewAnalyzer(resManager, rawReader, zone)
	ws.Route(
		ws.GET("/mesh-identity-report").
			To(func(request *restful.Request, response *restful.Response) {
				report, err := analyzer.Analyze(request.Request.Context())
				if err != nil {
					rest_errors.HandleError(request.Request.Context(), response, err, "Failed to build mesh identity migration report")
					return
				}
				if err := response.WriteHeaderAndJson(http.StatusOK, report, "application/json"); err != nil {
					log.Error(err, "Could not write response")
				}
			}).
			Doc("Get mesh identity migration report").
			Returns(http.StatusOK, "OK", nil),
	)
}
