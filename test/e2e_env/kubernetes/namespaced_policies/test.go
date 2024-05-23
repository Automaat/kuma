package namespaced_policies

import (
	"fmt"
	meshretry_api "github.com/kumahq/kuma/pkg/plugins/policies/meshretry/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/plugins/policies/meshtimeout/api/v1alpha1"
	. "github.com/kumahq/kuma/test/framework"
	"github.com/kumahq/kuma/test/framework/client"
	"github.com/kumahq/kuma/test/framework/deployments/democlient"
	"github.com/kumahq/kuma/test/framework/deployments/testserver"
	"github.com/kumahq/kuma/test/framework/envs/kubernetes"
	. "github.com/onsi/ginkgo/v2"
	"time"

	. "github.com/onsi/gomega"
)

func SimpleMeshTimeout(namespace string, mesh string, requestTimeout string) InstallFunc {
	meshTimeout := fmt.Sprintf(`
apiVersion: kuma.io/v1alpha1
kind: MeshTimeout
metadata:
  name: mt1
  namespace: %s
  labels:
    kuma.io/mesh: %s
spec:
  targetRef:
    kind: Mesh
  to:
    - targetRef:
        kind: Mesh
      default:
        http:
          requestTimeout: %s`, namespace, mesh, requestTimeout)
	return YamlK8s(meshTimeout)
}

func NamespacedPolicies() {
	const (
		consumerNamespace = "consumer-ns"
		producerNamespace = "producer-ns"
		mesh              = "namespaced-policy-mesh"
	)

	BeforeAll(func() {
		err := NewClusterSetup().
			Install(MeshKubernetes(mesh)).
			Install(NamespaceWithSidecarInjection(consumerNamespace)).
			Install(NamespaceWithSidecarInjection(producerNamespace)).
			Install(democlient.Install(democlient.WithNamespace(consumerNamespace), democlient.WithMesh(mesh))).
			Install(testserver.Install(testserver.WithNamespace(producerNamespace), testserver.WithMesh(mesh))).
			Setup(kubernetes.Cluster)
		Expect(err).ToNot(HaveOccurred())

		// Delete the default meshtimeout policy
		Expect(DeleteMeshPolicyOrError(
			kubernetes.Cluster,
			v1alpha1.MeshTimeoutResourceTypeDescriptor,
			fmt.Sprintf("mesh-timeout-all-%s", mesh),
		)).To(Succeed())

		// Delete the default meshretry policy
		Expect(DeleteMeshPolicyOrError(
			kubernetes.Cluster,
			meshretry_api.MeshRetryResourceTypeDescriptor,
			fmt.Sprintf("mesh-retry-all-%s", mesh),
		)).To(Succeed())
	})

	AfterEachFailure(func() {
		DebugKube(kubernetes.Cluster, mesh, consumerNamespace)
	})

	E2EAfterAll(func() {
		Expect(kubernetes.Cluster.TriggerDeleteNamespace(consumerNamespace)).To(Succeed())
		Expect(kubernetes.Cluster.TriggerDeleteNamespace(producerNamespace)).To(Succeed())
		Expect(kubernetes.Cluster.DeleteMesh(mesh)).To(Succeed())
	})

	E2EAfterEach(func() {
		Expect(DeleteMeshResources(kubernetes.Cluster, mesh, v1alpha1.MeshTimeoutResourceTypeDescriptor)).To(Succeed())
	})

	It("Should be able to apply policy on custom namespace", func() {
		// when
		Expect(kubernetes.Cluster.Install(SimpleMeshTimeout(consumerNamespace, mesh, "2s"))).To(Succeed())

		// then
		Eventually(func(g Gomega) {
			response, err := client.CollectFailure(
				kubernetes.Cluster, "demo-client", fmt.Sprintf("test-server_%s_svc_80.mesh", producerNamespace),
				client.FromKubernetesPod(consumerNamespace, "demo-client"),
				client.WithHeader("x-set-response-delay-ms", "5000"),
				client.WithMaxTime(10), // we don't want 'curl' to return early
			)
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(response.ResponseCode).To(Equal(504))
		}, "1m", "1s", MustPassRepeatedly(5)).Should(Succeed())
	})

	It("Consumer policy should override policy from system namespace", func() {
		// given
		Expect(kubernetes.Cluster.Install(SimpleMeshTimeout(consumerNamespace, mesh, "10s"))).To(Succeed())

		Eventually(func(g Gomega) {
			start := time.Now()
			_, err := client.CollectEchoResponse(
				kubernetes.Cluster, "demo-client", fmt.Sprintf("test-server_%s_svc_80.mesh", producerNamespace),
				client.FromKubernetesPod(consumerNamespace, "demo-client"),
				client.WithHeader("x-set-response-delay-ms", "5000"),
				client.WithMaxTime(10),
			)
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(time.Since(start)).To(BeNumerically(">", time.Second*5))
		}, "30s", "1s").Should(Succeed())

		// when
		Expect(kubernetes.Cluster.Install(SimpleMeshTimeout(consumerNamespace, mesh, "2s"))).To(Succeed())

		// then
		Eventually(func(g Gomega) {
			response, err := client.CollectFailure(
				kubernetes.Cluster, "demo-client", fmt.Sprintf("test-server_%s_svc_80.mesh", producerNamespace),
				client.FromKubernetesPod(consumerNamespace, "demo-client"),
				client.WithHeader("x-set-response-delay-ms", "5000"),
				client.WithMaxTime(10), // we don't want 'curl' to return early
			)
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(response.ResponseCode).To(Equal(504))
		}, "1m", "1s", MustPassRepeatedly(5)).Should(Succeed())
	})

	It("Consumer policy should override producer policy", func() {
		// given
		Expect(kubernetes.Cluster.Install(SimpleMeshTimeout(producerNamespace, mesh, "10s"))).To(Succeed())

		Eventually(func(g Gomega) {
			start := time.Now()
			_, err := client.CollectEchoResponse(
				kubernetes.Cluster, "demo-client", fmt.Sprintf("test-server_%s_svc_80.mesh", producerNamespace),
				client.FromKubernetesPod(consumerNamespace, "demo-client"),
				client.WithHeader("x-set-response-delay-ms", "5000"),
				client.WithMaxTime(10),
			)
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(time.Since(start)).To(BeNumerically(">", time.Second*5))
		}, "30s", "1s").Should(Succeed())

		// when
		Expect(kubernetes.Cluster.Install(SimpleMeshTimeout(consumerNamespace, mesh, "2s"))).To(Succeed())

		// then
		Eventually(func(g Gomega) {
			response, err := client.CollectFailure(
				kubernetes.Cluster, "demo-client", fmt.Sprintf("test-server_%s_svc_80.mesh", producerNamespace),
				client.FromKubernetesPod(consumerNamespace, "demo-client"),
				client.WithHeader("x-set-response-delay-ms", "5000"),
				client.WithMaxTime(10), // we don't want 'curl' to return early
			)
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(response.ResponseCode).To(Equal(504))
		}, "1m", "1s", MustPassRepeatedly(5)).Should(Succeed())
	})
}
