# Kuma 3.0 Observability - User Stories

## Personas

| Persona | Role | Goals | Context |
|---------|------|-------|---------|
| **Mesh Operator** | Deploys, configures, and manages Kuma control plane and mesh infrastructure | Reliable mesh with clear operational visibility, simple upgrades, seamless integration with org-wide observability tooling | Manages Kuma across environments, configures policies, owns observability pipelines, monitors mesh and zone health |
| **Service Owner** | Owns microservices running inside the mesh | Understand service behavior, debug latency/errors quickly, track reliability (SLOs) | Consumes dashboards and traces, configures per-service observability via policies, doesn't manage mesh infrastructure |

## 1. Remove `kumactl install observability`

> Legacy observability installer ships a full Prometheus/Grafana/Loki/Jaeger stack via kumactl. This must be removed in Kuma 3.0 - users should bring their own observability stack.

### 1.1 Remove `kumactl install observability` command

**As a** Mesh Operator,
**I want** the `kumactl install observability` command removed in Kuma 3.0,
**so that** I'm not confused by an opinionated, outdated observability stack and instead use my organization's existing tooling.

### 1.2 Ship Grafana dashboards in release tarball

**As a** Mesh Operator,
**I want** Grafana dashboards shipped as standalone JSON files in the Kuma release tarball,
**so that** I can import them into my existing Grafana instance using my own provisioning workflow (Terraform, Helm sidecar, Grafana API, etc.).

### 1.3 Remove Service Map dashboard

**As a** Mesh Operator,
**I want** the `kuma-service-to-service` Service Map dashboard removed,
**so that** the shipped dashboards are maintainable and don't include visualizations that duplicate native Grafana capabilities (Grafana Node Graph, Tempo service map).

## 2. Remove Pod Annotation-based Metrics Configuration

> Metrics configuration via `prometheus.metrics.kuma.io/*` pod annotations is the legacy approach. MeshMetric policy is the replacement.

### 2.1 Remove metrics pod annotations

**As a** Mesh Operator,
**I want** the ability to configure metrics through pod annotations (`prometheus.metrics.kuma.io/*`) removed in Kuma 3.0,
**so that** there's a single, policy-driven way (MeshMetric) to configure metrics collection, reducing confusion and configuration drift.

## 3. OTel Maturity

> OpenTelemetry backends in Kuma policies need to be production-ready for 3.0.

### 3.1 Graduate MeshMetric OTel backend to stable

**As a** Mesh Operator,
**I want** the MeshMetric OpenTelemetry backend promoted from experimental to stable,
**so that** I can confidently use OTel as the primary metrics pipeline in production.

Ref: [#11870](https://github.com/kumahq/kuma/issues/11870)

### 3.2 HTTP/HTTPS OTLP endpoint support

**As a** Mesh Operator,
**I want** MeshMetric, MeshTrace, and MeshAccessLog to support HTTP/HTTPS OTLP endpoints (port 4318) in addition to gRPC (port 4317),
**so that** I can integrate with OTel collectors and cloud providers that require or prefer HTTP transport.

Ref: [#9459](https://github.com/kumahq/kuma/issues/9459)

### 3.3 TLS and authentication for OTLP endpoints

**As a** Mesh Operator,
**I want** to configure TLS certificates and authentication (bearer token, API key headers) for OTLP endpoints,
**so that** I can securely send telemetry to managed OTel services and comply with security requirements.

### 3.4 Unified OTel backend configuration schema

**As a** Mesh Operator,
**I want** a consistent backend configuration format across MeshMetric, MeshTrace, and MeshAccessLog,
**so that** I don't have to learn different configuration patterns for each policy.

Ref: [#8884](https://github.com/kumahq/kuma/issues/8884)

## 4. Dashboard Modernization

> Shipped dashboards should reflect modern observability practices, OTel-native metrics, and the unified naming strategy (KRI-based labels, standardized Envoy resource/stats names). MeshServices Exclusive mode with unified naming will be the only available mode in Kuma 3.0, so dashboards must use the new label scheme (workload KRI, scope-based stats) instead of legacy labels (mesh, dataplane, service) which won't exist anymore.

### 4.1 Dashboards compatible with unified naming

**As a** Mesh Operator,
**I want** dashboards that use the unified naming labels (KRI-based workload identifiers, standardized Envoy stat names),
**so that** my dashboards work correctly with the new metric label scheme and I can correlate metrics to specific workloads and policies.

### 4.2 Golden Signals (RED/USE) dashboards

**As a** Service Owner,
**I want** dashboards organized around golden signals - Rate, Errors, Duration for services and Utilization, Saturation, Errors for infrastructure,
**so that** I can quickly assess service health using industry-standard patterns.

### 4.3 Multi-zone observability dashboard

**As a** Mesh Operator managing a multi-zone deployment,
**I want** a dashboard showing cross-zone traffic, zone health, and federation status,
**so that** I can monitor the health of my distributed mesh from a single pane.

## 5. Nice-to-Have Improvements

> Lower priority items that improve OTel integration depth. Target 3.0 if time permits.

### 5.1 Configurable context propagators

**As a** Mesh Operator running a heterogeneous environment (Kuma + Istio sidecars, Zipkin-instrumented services),
**I want** to configure trace context propagation format (W3C TraceContext, W3C Baggage, B3),
**so that** distributed traces aren't broken across service boundaries using different propagation formats.

### 5.2 Custom OTel resource attributes

**As a** Mesh Operator,
**I want** to define custom resource attributes on OTel telemetry exported by Kuma,
**so that** I can correlate mesh telemetry with my organization's metadata (team, cost-center, environment) in my OTel backend.

### 5.3 Advanced sampling strategies

**As a** Service Owner,
**I want** parent-based and tail-based sampling options in MeshTrace,
**so that** I can collect traces efficiently - honoring upstream sampling decisions and capturing error/slow traces without sampling everything.

## Open Questions

- SLO/SLI dashboards - should be included in 3.0?
- Security/policy compliance dashboards (mTLS status, RBAC) - should be included in 3.0?
