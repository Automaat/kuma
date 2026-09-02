package diagnostics

type Report struct {
	Issues []Issue `json:"issues"`
}

type Issue struct {
	Code    string `json:"code"`
	Mesh    string `json:"mesh,omitempty"`
	Message string `json:"message"`
}
