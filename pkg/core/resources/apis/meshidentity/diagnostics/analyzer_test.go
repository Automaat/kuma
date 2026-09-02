package diagnostics

import (
	"testing"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	common_api "github.com/kumahq/kuma/v3/api/common/v1alpha1"
	mesh_proto "github.com/kumahq/kuma/v3/api/mesh/v1alpha1"
	mesh_api "github.com/kumahq/kuma/v3/pkg/core/resources/apis/mesh"
	meshidentity_api "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	core_model "github.com/kumahq/kuma/v3/pkg/core/resources/model"
	test_model "github.com/kumahq/kuma/v3/pkg/test/resources/model"
)

func TestHasLegacyMTLS(t *testing.T) {
	if !HasLegacyMTLS([]byte(`{"mtls":{"enabledBackend":"builtin"}}`)) {
		t.Fatal("expected legacy mtls to be detected")
	}
	if HasLegacyMTLS([]byte(`{"routing":{}}`)) {
		t.Fatal("did not expect legacy mtls to be detected")
	}
}

func TestMeshNeedsIdentity(t *testing.T) {
	dataplane := mesh_api.NewDataplaneResource()
	dataplane.SetMeta(&test_model.ResourceMeta{
		Name:   "dp-1",
		Mesh:   "default",
		Labels: map[string]string{"app": "demo"},
	})
	if err := dataplane.SetSpec(&mesh_proto.Dataplane{}); err != nil {
		t.Fatal(err)
	}

	if !meshNeedsIdentity([]core_model.Resource{dataplane}, nil) {
		t.Fatal("expected mesh without identities to be reported")
	}

	identity := meshidentity_api.NewMeshIdentityResource()
	identity.SetMeta(&test_model.ResourceMeta{
		Name: "id-1",
		Mesh: "default",
	})
	identity.Spec.Selector = &meshidentity_api.Selector{
		Dataplane: &common_api.LabelSelector{
			MatchLabels: &map[string]string{"app": "demo"},
		},
	}
	identity.Status = &meshidentity_api.MeshIdentityStatus{
		Conditions: []common_api.Condition{{
			Type:   meshidentity_api.ReadyConditionType,
			Status: metav1.ConditionTrue,
			Reason: "Ready",
		}},
	}

	if meshNeedsIdentity([]core_model.Resource{dataplane}, []core_model.Resource{identity}) {
		t.Fatal("expected initialized identity to cover dataplane")
	}
}
