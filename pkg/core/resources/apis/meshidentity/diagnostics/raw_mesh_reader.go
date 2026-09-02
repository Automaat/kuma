package diagnostics

import (
	"context"
	"encoding/json"
)

type LegacyMeshSpecReader interface {
	ReadRawMeshSpec(ctx context.Context, mesh string) ([]byte, error)
}

func HasLegacyMTLS(rawSpec []byte) bool {
	if len(rawSpec) == 0 {
		return false
	}
	var spec map[string]json.RawMessage
	if err := json.Unmarshal(rawSpec, &spec); err != nil {
		return false
	}
	_, ok := spec["mtls"]
	return ok
}
