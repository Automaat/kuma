// Generated by tools/policy-gen.
// Run "make generate" to update this file.

// nolint:whitespace
package v1alpha1

import (
	_ "embed"
	"fmt"

	"k8s.io/kube-openapi/pkg/validation/spec"
	"sigs.k8s.io/yaml"

	"github.com/kumahq/kuma/pkg/core/resources/model"
)

//go:embed schema.yaml
var rawSchema []byte

func init() {
	var schema spec.Schema
	if err := yaml.Unmarshal(rawSchema, &schema); err != nil {
		panic(err)
	}
	rawSchema = nil
	MeshServiceResourceTypeDescriptor.Schema = &schema
}

const (
	MeshServiceType model.ResourceType = "MeshService"
)

var _ model.Resource = &MeshServiceResource{}

type MeshServiceResource struct {
	Meta   model.ResourceMeta
	Spec   *MeshService
	Status *MeshServiceStatus
}

func NewMeshServiceResource() *MeshServiceResource {
	return &MeshServiceResource{
		Spec:   &MeshService{},
		Status: &MeshServiceStatus{},
	}
}

func (t *MeshServiceResource) GetMeta() model.ResourceMeta {
	return t.Meta
}

func (t *MeshServiceResource) SetMeta(m model.ResourceMeta) {
	t.Meta = m
}

func (t *MeshServiceResource) GetSpec() model.ResourceSpec {
	return t.Spec
}

func (t *MeshServiceResource) SetSpec(spec model.ResourceSpec) error {
	protoType, ok := spec.(*MeshService)
	if !ok {
		return fmt.Errorf("invalid type %T for Spec", spec)
	} else {
		if protoType == nil {
			t.Spec = &MeshService{}
		} else {
			t.Spec = protoType
		}
		return nil
	}
}

func (t *MeshServiceResource) GetStatus() model.ResourceStatus {
	return t.Status
}

func (t *MeshServiceResource) SetStatus(status model.ResourceStatus) error {
	protoType, ok := status.(*MeshServiceStatus)
	if !ok {
		return fmt.Errorf("invalid type %T for Status", status)
	} else {
		if protoType == nil {
			t.Status = &MeshServiceStatus{}
		} else {
			t.Status = protoType
		}
		return nil
	}
}

func (t *MeshServiceResource) Descriptor() model.ResourceTypeDescriptor {
	return MeshServiceResourceTypeDescriptor
}

func (t *MeshServiceResource) Validate() error {
	if v, ok := interface{}(t).(interface{ validate() error }); !ok {
		return nil
	} else {
		return v.validate()
	}
}

var _ model.ResourceList = &MeshServiceResourceList{}

type MeshServiceResourceList struct {
	Items      []*MeshServiceResource
	Pagination model.Pagination
}

func (l *MeshServiceResourceList) GetItems() []model.Resource {
	res := make([]model.Resource, len(l.Items))
	for i, elem := range l.Items {
		res[i] = elem
	}
	return res
}

func (l *MeshServiceResourceList) GetItemType() model.ResourceType {
	return MeshServiceType
}

func (l *MeshServiceResourceList) NewItem() model.Resource {
	return NewMeshServiceResource()
}

func (l *MeshServiceResourceList) AddItem(r model.Resource) error {
	if trr, ok := r.(*MeshServiceResource); ok {
		l.Items = append(l.Items, trr)
		return nil
	} else {
		return model.ErrorInvalidItemType((*MeshServiceResource)(nil), r)
	}
}

func (l *MeshServiceResourceList) GetPagination() *model.Pagination {
	return &l.Pagination
}

func (l *MeshServiceResourceList) SetPagination(p model.Pagination) {
	l.Pagination = p
}

var MeshServiceResourceTypeDescriptor = model.ResourceTypeDescriptor{
	Name:                MeshServiceType,
	Resource:            NewMeshServiceResource(),
	ResourceList:        &MeshServiceResourceList{},
	Scope:               model.ScopeMesh,
	KDSFlags:            model.GlobalToAllZonesFlag | model.ZoneToGlobalFlag,
	WsPath:              "meshservices",
	KumactlArg:          "meshservice",
	KumactlListArg:      "meshservices",
	AllowToInspect:      false,
	IsPolicy:            false,
	IsExperimental:      false,
	SingularDisplayName: "Mesh Service",
	PluralDisplayName:   "Mesh Services",
	IsPluginOriginated:  true,
	IsTargetRefBased:    false,
	HasToTargetRef:      false,
	HasFromTargetRef:    false,
	HasStatus:           true,
}
