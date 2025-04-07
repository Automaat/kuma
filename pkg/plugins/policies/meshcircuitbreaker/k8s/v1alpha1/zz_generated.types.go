// Generated by tools/policy-gen
// Run "make generate" to update this file.

// nolint:whitespace
package v1alpha1

import (
	"errors"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	core_model "github.com/kumahq/kuma/pkg/core/resources/model"
	policy "github.com/kumahq/kuma/pkg/plugins/policies/meshcircuitbreaker/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/plugins/resources/k8s/native/pkg/model"
	"github.com/kumahq/kuma/pkg/plugins/resources/k8s/native/pkg/registry"
	"github.com/kumahq/kuma/pkg/plugins/runtime/k8s/metadata"
)

// +kubebuilder:object:root=true
// +kubebuilder:resource:categories=kuma,scope=Namespaced,shortName=mcb
// +kubebuilder:printcolumn:name="TargetRef Kind",type="string",JSONPath=".spec.targetRef.kind"
// +kubebuilder:printcolumn:name="TargetRef Name",type="string",JSONPath=".spec.targetRef.name"
type MeshCircuitBreaker struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	// Spec is the specification of the Kuma MeshCircuitBreaker resource.
	// +kubebuilder:validation:Optional
	Spec *policy.MeshCircuitBreaker `json:"spec,omitempty"`
}

// +kubebuilder:object:root=true
// +kubebuilder:resource:scope=Namespaced
type MeshCircuitBreakerList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []MeshCircuitBreaker `json:"items"`
}

func (cb *MeshCircuitBreaker) GetObjectMeta() *metav1.ObjectMeta {
	return &cb.ObjectMeta
}

func (cb *MeshCircuitBreaker) SetObjectMeta(m *metav1.ObjectMeta) {
	cb.ObjectMeta = *m
}

func (cb *MeshCircuitBreaker) GetMesh() string {
	if mesh, ok := cb.Labels[metadata.KumaMeshLabel]; ok {
		return mesh
	} else {
		return core_model.DefaultMesh
	}
}

func (cb *MeshCircuitBreaker) SetMesh(mesh string) {
	if cb.Labels == nil {
		cb.Labels = map[string]string{}
	}
	cb.Labels[metadata.KumaMeshLabel] = mesh
}

func (cb *MeshCircuitBreaker) GetSpec() (core_model.ResourceSpec, error) {
	return cb.Spec, nil
}

func (cb *MeshCircuitBreaker) SetSpec(spec core_model.ResourceSpec) {
	if spec == nil {
		cb.Spec = nil
		return
	}

	if _, ok := spec.(*policy.MeshCircuitBreaker); !ok {
		panic(fmt.Sprintf("unexpected protobuf message type %T", spec))
	}

	cb.Spec = spec.(*policy.MeshCircuitBreaker)
}

func (cb *MeshCircuitBreaker) GetStatus() (core_model.ResourceStatus, error) {
	return nil, nil
}

func (cb *MeshCircuitBreaker) SetStatus(status core_model.ResourceStatus) error {
	return errors.New("status not supported")
}

func (cb *MeshCircuitBreaker) Scope() model.Scope {
	return model.ScopeNamespace
}

func (l *MeshCircuitBreakerList) GetItems() []model.KubernetesObject {
	result := make([]model.KubernetesObject, len(l.Items))
	for i := range l.Items {
		result[i] = &l.Items[i]
	}
	return result
}

func init() {
	SchemeBuilder.Register(&MeshCircuitBreaker{}, &MeshCircuitBreakerList{})
	registry.RegisterObjectType(&policy.MeshCircuitBreaker{}, &MeshCircuitBreaker{
		TypeMeta: metav1.TypeMeta{
			APIVersion: GroupVersion.String(),
			Kind:       "MeshCircuitBreaker",
		},
	})
	registry.RegisterListType(&policy.MeshCircuitBreaker{}, &MeshCircuitBreakerList{
		TypeMeta: metav1.TypeMeta{
			APIVersion: GroupVersion.String(),
			Kind:       "MeshCircuitBreakerList",
		},
	})
}
