package resources

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	error_types "github.com/kumahq/kuma/v3/pkg/core/rest/errors/types"
	util_http "github.com/kumahq/kuma/v3/pkg/util/http"
)

type rawResourceResponse struct {
	Spec json.RawMessage `json:"spec"`
}

func doRequest(client util_http.Client, ctx context.Context, req *http.Request) (int, []byte, error) {
	resp, err := client.Do(req.WithContext(ctx))
	if err != nil {
		return 0, nil, err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, nil, err
	}
	if resp.StatusCode/100 >= 4 {
		kumaErr := error_types.Error{}
		if err := json.Unmarshal(b, &kumaErr); err == nil {
			if kumaErr.Title != "" {
				return resp.StatusCode, b, &kumaErr
			}
		}
	}
	return resp.StatusCode, b, nil
}

func ReadSpecFromResponse(resp *http.Response) ([]byte, error) {
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	resource := rawResourceResponse{}
	if err := json.Unmarshal(body, &resource); err != nil {
		return nil, err
	}
	return resource.Spec, nil
}
