package meshroute_test

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/v2/pkg/core/kri"
	core_meta "github.com/kumahq/kuma/v2/pkg/core/metadata"
	meshservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshservice/api/v1alpha1"
	core_model "github.com/kumahq/kuma/v2/pkg/core/resources/model"
	"github.com/kumahq/kuma/v2/pkg/plugins/policies/core/rules/resolve"
	"github.com/kumahq/kuma/v2/pkg/plugins/policies/core/xds/meshroute"
	"github.com/kumahq/kuma/v2/pkg/test/resources/builders"
	xds_context "github.com/kumahq/kuma/v2/pkg/xds/context"
)

var _ = Describe("SniForBackendRef", func() {
	DescribeTable("returns SNI built from resolved port",
		func(sectionName string) {
			ms := builders.MeshService().
				WithName("backend").
				WithMesh("default").
				AddIntPortWithName(8080, 8080, core_meta.ProtocolHTTP, "http").
				Build()

			port, ok := ms.FindPortByName(sectionName)
			Expect(ok).To(BeTrue())

			id := kri.WithSectionName(kri.From(ms), sectionName)
			ref := &resolve.RealResourceBackendRef{Resource: id}

			sni := meshroute.SniForBackendRef(ref, ms, port, "")

			Expect(sni).NotTo(BeEmpty())
			Expect(sni).To(ContainSubstring(".8080."))
		},
		Entry("by port name", "http"),
		Entry("by port value", "8080"),
	)

	It("uses SNIName for MeshService destination", func() {
		ms := builders.MeshService().
			WithName("backend").
			WithMesh("default").
			AddIntPortWithName(8080, 8080, core_meta.ProtocolHTTP, "http").
			Build()

		port, ok := ms.FindPortByName("http")
		Expect(ok).To(BeTrue())

		id := kri.WithSectionName(kri.From(ms), "http")
		id.ResourceType = meshservice_api.MeshServiceType
		ref := &resolve.RealResourceBackendRef{Resource: id}

		sni := meshroute.SniForBackendRef(ref, ms, port, "kuma-system")

		Expect(sni).To(ContainSubstring(ms.SNIName("kuma-system")))
	})
})

var _ = Describe("DestinationPortFromRef", func() {
	newMeshCtx := func(resources ...core_model.Resource) xds_context.MeshContext {
		return xds_context.MeshContext{
			BaseMeshContext: &xds_context.BaseMeshContext{
				DestinationIndex: xds_context.NewDestinationIndex(resources),
			},
		}
	}

	It("returns false when SectionName does not resolve to a port", func() {
		ms := builders.MeshService().
			WithName("backend").
			WithMesh("default").
			AddIntPortWithName(8080, 8080, core_meta.ProtocolHTTP, "http").
			Build()

		id := kri.WithSectionName(kri.From(ms), "unknown")
		ref := &resolve.RealResourceBackendRef{Resource: id}

		dest, port, ok := meshroute.DestinationPortFromRef(newMeshCtx(ms), ref)

		Expect(ok).To(BeFalse())
		Expect(dest).To(BeNil())
		Expect(port).To(BeNil())
	})

	It("returns false when destination service is missing", func() {
		id := kri.Identifier{
			ResourceType: meshservice_api.MeshServiceType,
			Mesh:         "default",
			Name:         "missing",
			SectionName:  "http",
		}
		ref := &resolve.RealResourceBackendRef{Resource: id}

		dest, port, ok := meshroute.DestinationPortFromRef(newMeshCtx(), ref)

		Expect(ok).To(BeFalse())
		Expect(dest).To(BeNil())
		Expect(port).To(BeNil())
	})

	It("returns resolved destination and port when SectionName matches", func() {
		ms := builders.MeshService().
			WithName("backend").
			WithMesh("default").
			AddIntPortWithName(8080, 8080, core_meta.ProtocolHTTP, "http").
			Build()

		id := kri.WithSectionName(kri.From(ms), "http")
		ref := &resolve.RealResourceBackendRef{Resource: id}

		dest, port, ok := meshroute.DestinationPortFromRef(newMeshCtx(ms), ref)

		Expect(ok).To(BeTrue())
		Expect(dest).NotTo(BeNil())
		Expect(port.GetValue()).To(BeEquivalentTo(8080))
	})
})
