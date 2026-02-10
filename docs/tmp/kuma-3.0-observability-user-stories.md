# Kuma 3.0 Observability - User Stories

## Personas

| Persona | Role | Goals | Context |
|---------|------|-------|---------|
| **Mesh Operator** | Deploys, configures, and manages Kuma control plane and mesh infrastructure | Reliable mesh with clear operational visibility, simple upgrades, seamless integration with org-wide observability tooling | Manages Kuma across environments, configures policies, owns observability pipelines, monitors mesh and zone health |
| **Service Owner** | Owns microservices running inside the mesh | Understand service behavior, debug latency/errors quickly, track reliability (SLOs) | Consumes dashboards and traces, configures per-service observability via policies, doesn't manage mesh infrastructure |

---

## Epic 1: Remove `kumactl install observability`

> Legacy observability installer ships a full Prometheus/Grafana/Loki/Jaeger stack via kumactl. This must be removed in Kuma 3.0 - users should bring their own observability stack.

### 1.1 Remove `kumactl install observability` command

**As a** Mesh Operator,
**I want** the `kumactl install observability` command removed in Kuma 3.0,
**so that** I'm not confused by an opinionated, outdated observability stack and instead use my organization's existing tooling.

**Acceptance Criteria:**
- `kumactl install observability` is removed from the CLI
- All associated templates, contexts, and embedded resources are deleted
- Release notes document the removal and migration path
- Kuma 2.14 (intermediate release) prints a deprecation warning when the command is used

### 1.2 Ship Grafana dashboards in release tarball

**As a** Mesh Operator,
**I want** Grafana dashboards shipped as standalone JSON files in the Kuma release tarball,
**so that** I can import them into my existing Grafana instance using my own provisioning workflow (Terraform, Helm sidecar, Grafana API, etc.).

**Acceptance Criteria:**
- Release tarball contains a `dashboards/` directory with all dashboard JSON files
- Dashboards are valid Grafana JSON that can be imported directly
- Dashboards are available starting from Kuma 2.14 (intermediate release)
- Documentation explains how to import dashboards into existing Grafana

### 1.3 Remove Service Map dashboard

**As a** Mesh Operator,
**I want** the `kuma-service-to-service` Service Map dashboard removed,
**so that** the shipped dashboards are maintainable and don't include visualizations that duplicate native Grafana capabilities (Grafana Node Graph, Tempo service map).

**Acceptance Criteria:**
- `kuma-service-to-service.json` is removed from shipped dashboards
- Documentation points users to native Grafana service map alternatives

---

## Epic 2: Virtual Probes Cleanup

> Virtual probes (`kuma.io/virtual-probes`) have been deprecated in favor of Application Probe Proxy. Remove all remnants.

### 2.1 Remove virtual probes code

**As a** Mesh Operator,
**I want** the deprecated virtual probes feature fully removed in Kuma 3.0,
**so that** only the supported Application Probe Proxy mechanism exists and there's no ambiguity about which approach to use.

**Acceptance Criteria:**
- `kuma.io/virtual-probes` and `kuma.io/virtual-probes-port` annotations are no longer recognized
- `KumaProbe.ToVirtual()` / `ToReal()` virtual-probe-specific code paths are removed
- Deprecation entries in `PodAnnotationDeprecations` for virtual probes are removed (annotations simply don't exist anymore)
- Kuma 2.14 logs a warning when virtual probes annotations are detected on pods
- Migration guide documents how to switch to Application Probe Proxy

---

## Epic 3: Remove Pod Annotation-based Metrics Configuration

> Metrics configuration via `prometheus.metrics.kuma.io/*` pod annotations is the legacy approach. MeshMetric policy is the replacement.

### 3.1 Remove metrics pod annotations

**As a** Mesh Operator,
**I want** the ability to configure metrics through pod annotations (`prometheus.metrics.kuma.io/*`) removed in Kuma 3.0,
**so that** there's a single, policy-driven way (MeshMetric) to configure metrics collection, reducing confusion and configuration drift.

**Acceptance Criteria:**
- `prometheus.metrics.kuma.io/port`, `/path`, `/aggregate-*` annotations are no longer processed
- Annotation parsing logic in `metadata/annotations.go` is removed
- MeshMetric policy is the only way to configure metrics
- Kuma 2.14 logs a warning when these annotations are detected
- Migration guide documents how to replicate annotation-based config via MeshMetric policy

---

## Epic 4: OTel Maturity

> OpenTelemetry backends in Kuma policies need to be production-ready for 3.0.

### 4.1 Graduate MeshMetric OTel backend to stable

**As a** Mesh Operator,
**I want** the MeshMetric OpenTelemetry backend promoted from experimental to stable,
**so that** I can confidently use OTel as the primary metrics pipeline in production.

**Acceptance Criteria:**
- Experimental flag/label is removed from MeshMetric OTel backend
- OTel backend is tested at scale and documented as production-ready
- No behavioral changes required from users already using the experimental backend

Ref: [#11870](https://github.com/kumahq/kuma/issues/11870)

### 4.2 HTTP/HTTPS OTLP endpoint support

**As a** Mesh Operator,
**I want** MeshMetric, MeshTrace, and MeshAccessLog to support HTTP/HTTPS OTLP endpoints (port 4318) in addition to gRPC (port 4317),
**so that** I can integrate with OTel collectors and cloud providers that require or prefer HTTP transport.

**Acceptance Criteria:**
- All three policies support `http` and `https` OTLP protocols alongside `grpc`
- Protocol is configurable per backend
- HTTPS supports TLS configuration (CA cert, client cert, skip verify)
- Default behavior remains gRPC for backward compatibility

Ref: [#9459](https://github.com/kumahq/kuma/issues/9459)

### 4.3 TLS and authentication for OTLP endpoints

**As a** Mesh Operator,
**I want** to configure TLS certificates and authentication (bearer token, API key headers) for OTLP endpoints,
**so that** I can securely send telemetry to managed OTel services and comply with security requirements.

**Acceptance Criteria:**
- TLS configuration: custom CA, client certificates, server name verification
- Bearer token authentication via header
- Custom header support (for API keys)
- Configuration is consistent across MeshMetric, MeshTrace, MeshAccessLog

### 4.4 Unified OTel backend configuration schema

**As a** Mesh Operator,
**I want** a consistent backend configuration format across MeshMetric, MeshTrace, and MeshAccessLog,
**so that** I don't have to learn different configuration patterns for each policy.

**Acceptance Criteria:**
- OTel backend config structure (endpoint, protocol, TLS, auth) is identical across all three policies
- Validation rules are consistent
- Existing configurations continue to work (backward compatible in 2.x, cleaned up in 3.0)

Ref: [#8884](https://github.com/kumahq/kuma/issues/8884)

---

## Epic 5: Dashboard Modernization

> Shipped dashboards should reflect modern observability practices and OTel-native metrics.

### 5.1 OTel-native dashboards

**As a** Mesh Operator,
**I want** dashboards that work with metrics collected via the MeshMetric OTel backend,
**so that** my OTel-based metrics pipeline has first-class visualization support.

**Acceptance Criteria:**
- Dashboards query OTel-format metrics (stored in Prometheus via OTel Collector's Prometheus exporter or OTLP-compatible backends)
- Dashboard variables allow selecting the metrics datasource
- Documentation explains the expected metric names and labels

### 5.2 Golden Signals (RED/USE) dashboards

**As a** Service Owner,
**I want** dashboards organized around golden signals - Rate, Errors, Duration for services and Utilization, Saturation, Errors for infrastructure,
**so that** I can quickly assess service health using industry-standard patterns.

**Acceptance Criteria:**
- Service-level dashboard with Rate, Error rate, and Duration (p50/p90/p99)
- Dataplane-level dashboard with resource utilization metrics
- Alerting thresholds are suggested in documentation

### 5.3 Multi-zone observability dashboard

**As a** Mesh Operator managing a multi-zone deployment,
**I want** a dashboard showing cross-zone traffic, zone health, and federation status,
**so that** I can monitor the health of my distributed mesh from a single pane.

**Acceptance Criteria:**
- Dashboard shows per-zone control plane health
- Cross-zone traffic volume and latency visible
- Zone sync/federation status (KDS metrics) included
- Works with both global and zone control planes

---

## Epic 6: Metrics & Compatibility

### 6.1 Prometheus 3 UTF-8 metric name compatibility

**As a** Mesh Operator,
**I want** Kuma metrics to be compatible with Prometheus 3's UTF-8 metric naming,
**so that** upgrading Prometheus doesn't break my monitoring setup.

**Acceptance Criteria:**
- Metric names follow Prometheus 3 naming conventions
- No breaking changes for users on Prometheus 2.x
- Validated against Prometheus 3 scrape endpoint

Ref: [#14426](https://github.com/kumahq/kuma/issues/14426)

### 6.2 PodMonitor support for MeshMetric

**As a** Mesh Operator using Prometheus Operator,
**I want** MeshMetric to define container ports so PodMonitors can discover scrape targets,
**so that** I can use Prometheus Operator's native service discovery instead of custom scrape configs.

**Acceptance Criteria:**
- MeshMetric Prometheus backend exposes a named container port
- PodMonitor can select Kuma sidecars by port name
- Documentation provides example PodMonitor manifest

Ref: [#13281](https://github.com/kumahq/kuma/issues/13281)

---

## Epic 7: Nice-to-Have Improvements

> Lower priority items that improve OTel integration depth. Target 3.0 if time permits, otherwise 3.1.

### 7.1 Configurable context propagators

**As a** Mesh Operator running a heterogeneous environment (Kuma + Istio sidecars, Zipkin-instrumented services),
**I want** to configure trace context propagation format (W3C TraceContext, W3C Baggage, B3),
**so that** distributed traces aren't broken across service boundaries using different propagation formats.

**Acceptance Criteria:**
- MeshTrace supports configurable propagator list
- Supported propagators: W3C TraceContext (default), W3C Baggage, B3 single-header, B3 multi-header
- Multiple propagators can be active simultaneously (inject all, extract any)

### 7.2 Custom OTel resource attributes

**As a** Mesh Operator,
**I want** to define custom resource attributes on OTel telemetry exported by Kuma,
**so that** I can correlate mesh telemetry with my organization's metadata (team, cost-center, environment) in my OTel backend.

**Acceptance Criteria:**
- MeshMetric and MeshTrace support user-defined resource attributes (key-value pairs)
- Attributes are attached to all exported OTel signals

### 7.3 Advanced sampling strategies

**As a** Service Owner,
**I want** parent-based and tail-based sampling options in MeshTrace,
**so that** I can collect traces efficiently - honoring upstream sampling decisions and capturing error/slow traces without sampling everything.

**Acceptance Criteria:**
- Parent-based sampling: respects upstream sampling decision
- Tail-based sampling: samples based on span attributes (error, latency threshold)
- Configurable per-service via MeshTrace targetRef

---

## Priority Summary

| Priority | Epic | Target Release |
|----------|------|---------------|
| P0 | Epic 1: Remove `kumactl install observability` (3 stories) | 2.14 (deprecation) + 3.0 (removal) |
| P0 | Epic 2: Virtual probes cleanup | 2.14 (warning) + 3.0 (removal) |
| P0 | Epic 3: Remove metrics pod annotations | 2.14 (warning) + 3.0 (removal) |
| P0 | Epic 4: OTel maturity (4.1, 4.2, 4.3, 4.4) | 3.0 |
| P1 | Epic 5: Dashboard modernization | 3.0 |
| P1 | Epic 6: Metrics & compatibility | 3.0 |
| P2 | Epic 7: Nice-to-have improvements | 3.0 if capacity, otherwise 3.1 |

---

## Open Questions

- Dashboard format: JSON only or Jsonnet for templating? ([#7167](https://github.com/kumahq/kuma/issues/7167))
- Should dashboards also support ConfigMap-based installation for Grafana sidecar provisioning? ([#10369](https://github.com/kumahq/kuma/issues/10369))
- Scope of "unified backend config" - full alignment in 3.0 or incremental?
- SLO/SLI dashboards - include in 3.0 scope or defer to 3.1?
- Security/policy compliance dashboards (mTLS status, RBAC) - include or separate epic?
