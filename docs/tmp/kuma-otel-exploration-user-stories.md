# Kuma + OpenTelemetry - Exploration User Stories

> Research-driven user stories exploring how users could use Kuma with OpenTelemetry. Based on analysis of Istio, Linkerd, Cilium, Consul Connect, Gloo Mesh, Google Cloud Service Mesh, industry surveys (CNCF 2024, Grafana Observability Survey 2024, Observability Pulse 2024), KubeCon talks, and community discussions.

## Personas

| Persona | Role | Goals | Context |
|---------|------|-------|---------|****
| **Mesh Operator** | Deploys, configures, and manages Kuma control plane and mesh infrastructure | Reliable mesh with clear operational visibility, simple upgrades, seamless integration with org-wide observability tooling | Manages Kuma across environments, configures policies, owns observability pipelines, monitors mesh and zone health |
| **Service Owner** | Owns microservices running inside the mesh | Understand service behavior, debug latency/errors quickly, track reliability (SLOs) | Consumes dashboards and traces, configures per-service observability via policies, doesn't manage mesh infrastructure |

## 1. Unified Telemetry Pipeline

> Users dislike running Prometheus + Jaeger + Fluentbit separately. [89% invest in Prometheus, 85% in OTel, but 43% are actively investigating OTel as replacement](https://grafana.com/observability-survey/2024/). Gloo Mesh differentiates by having an OTel-native pipeline. Linkerd explicitly moved away from bundled Prometheus because ["it isn't appropriate for production use"](https://linkerd.io/2025/09/09/linkerd-with-opentelemetry/).

### 1.1 Single OTel Collector as telemetry target for all signals

**As a** Mesh Operator,
**I want** to configure a single OTel Collector endpoint that receives metrics, traces, and access logs from all mesh proxies,
**so that** I run one telemetry pipeline instead of maintaining separate Prometheus, Jaeger, and log collection systems.

### 1.2 Per-environment telemetry routing

**As a** Mesh Operator managing staging and production environments,
**I want** to route telemetry from different mesh zones to different OTel backends using a single policy,
**so that** production gets full-fidelity data (Grafana Cloud) while staging uses a cheaper backend (local Prometheus) without duplicating mesh configuration.

### 1.3 OTel Collector deployment guidance as part of mesh setup

**As a** Mesh Operator new to OpenTelemetry,
**I want** documented reference architectures for deploying OTel Collector with Kuma (DaemonSet per node, centralized Collector Deployment as aggregation/routing gateway, or two-tier with DaemonSet agents forwarding to centralized Deployment),
**so that** I pick the right topology for my scale without trial-and-error that could cause [metric explosion (20-40x multiplier seen with wrong DaemonSet config)](https://www.cncf.io/blog/2025/12/16/how-to-build-a-cost-effective-observability-platform-with-opentelemetry/) or data loss.

### 1.4 Native OTLP metric export from proxies

**As a** Mesh Operator,
**I want** Envoy proxies to export metrics directly via OTLP (OpenTelemetry Protocol) (not only Prometheus scrape),
**so that** I eliminate the Prometheus-to-OTLP conversion hop and reduce collector complexity.

## 2. Telemetry Cost Management

> [61% of organizations cite cost/unexpected bills as biggest observability concern](https://grafana.com/observability-survey/2024/). [32% actively collect less monitoring data](https://logz.io/observability-pulse-2024/). Envoy emits 378+ metrics by default. [STCLab achieved 72% cost reduction by centralizing OTel architecture](https://www.cncf.io/blog/2025/12/16/how-to-build-a-cost-effective-observability-platform-with-opentelemetry/). Metric cardinality explosion is a top pain point across all meshes.

### 2.1 Metric cardinality limits per policy

**As a** Mesh Operator,
**I want** to set maximum cardinality limits on labels emitted by mesh proxies (e.g., cap unique label combinations per metric),
**so that** a single misconfigured service can't blow up my metrics backend costs.

### 2.2 Metric filtering via allowlist/denylist patterns

**As a** Mesh Operator,
**I want** to filter which Envoy metrics are emitted using include/exclude patterns at the policy level (not just profiles),
**so that** I drop high-volume, low-value metrics (e.g., `envoy_.*_internal_.*`) before they leave the proxy and save on ingestion costs.

### 2.3 Telemetry cost estimation visibility

**As a** Mesh Operator,
**I want** to see estimated telemetry volume (metrics/sec, spans/sec, log lines/sec) per mesh or per zone in the control plane,
**so that** I can predict backend costs and identify which services generate the most telemetry before my bill surprises me.

### 2.4 Per-service sampling rate overrides

**As a** Service Owner running a high-traffic service (10k+ RPS),
**I want** to set a lower trace sampling rate for my service than the mesh-wide default,
**so that** I reduce tracing costs without affecting sampling for low-traffic services that need higher coverage.

## 3. Signal Correlation

> [Mean Time To Recovery (MTTR) exceeds 1 hour for 82% of organizations. Only 9% say they've "greatly reduced" MTTR](https://logz.io/observability-pulse-2024/). The #1 gap is correlating mesh-level telemetry (proxy metrics, access logs) with application-level telemetry (app traces, custom metrics). Consul differentiates with [merged metrics endpoints](https://www.hashicorp.com/en/blog/improve-observability-with-opentelemetry-and-consul-service-mesh).

### 3.1 Access logs enriched with trace context

**As a** Service Owner debugging a production incident,
**I want** mesh access logs to automatically include trace ID and span ID fields,
**so that** I can click from a suspicious log entry directly to the full distributed trace in my tracing backend without manually correlating timestamps.

### 3.2 Merged application + proxy metrics endpoint

**As a** Service Owner,
**I want** the mesh to merge my application's Prometheus metrics with the sidecar proxy metrics into a single scrape endpoint,
**so that** my monitoring pipeline collects both app-level and mesh-level metrics per pod without configuring two scrape targets.

### 3.3 Consistent resource attributes across all signals

**As a** Mesh Operator,
**I want** all telemetry (metrics, traces, logs) emitted by mesh proxies to share consistent OTel resource attributes (`service.name`, `service.namespace`, `k8s.pod.name`, `kuma.io/zone`),
**so that** I can correlate signals in my backend by filtering on the same attribute across dashboards, trace views, and log queries.

### 3.4 Exemplars linking metrics to traces

**As a** Service Owner,
**I want** mesh-generated metrics (like request duration histograms) to include exemplars pointing to specific trace IDs,
**so that** when I see a latency spike on a dashboard, I can jump to an example trace showing what caused it.

## 4. Distributed Tracing Depth

> Context propagation is the #1 pain point across all meshes. [Istio FAQ explicitly states proxies cannot correlate inbound/outbound requests without application cooperation](https://istio.io/latest/about/faq/distributed-tracing/). Multiple propagation formats coexist (W3C, B3, Jaeger, Datadog). Users want tracing to ["just work"](https://medium.com/@YuriShkuro/myth-service-mesh-can-do-distributed-tracing-of-your-application-7a5cb5e3b617).

### 4.1 Automatic trace context injection for uninstrumented services

**As a** Service Owner with legacy services that don't propagate trace headers,
**I want** the mesh proxy to inject trace context headers into requests entering my service,
**so that** my service appears in distributed traces even before I add OTel instrumentation to my code.

### 4.2 Multi-format context propagation

**As a** Mesh Operator running a heterogeneous environment with Zipkin-instrumented services and OTel-instrumented services,
**I want** to configure the mesh to propagate multiple trace context formats simultaneously (W3C TraceContext + B3),
**so that** traces aren't broken at boundaries between services using different propagation formats.

### 4.3 Cross-zone distributed trace continuity

**As a** Mesh Operator managing a multi-zone deployment,
**I want** distributed traces to remain connected across zone boundaries with zone identification attributes on each span,
**so that** I can trace a request from zone-a through the global control plane to zone-b without trace fragmentation.

### 4.4 Trace-aware traffic routing diagnostics

**As a** Service Owner debugging why requests route to unexpected backends,
**I want** mesh-generated trace spans to include routing metadata (which policy matched, which route was selected, retry/timeout config applied),
**so that** I can see the mesh's routing decisions alongside my application spans in a single trace view.

## 5. Advanced Sampling (Inteligent tracing)

> [Tail-based sampling is the most-requested strategy](https://opentelemetry.io/blog/2022/tail-sampling/). Requires stateful collectors with consistent hashing. Users want "always capture errors and slow traces" without sampling everything. Rule-based sampling per service is common in production (high-traffic at 1%, error paths at 100%).

### 5.1 Error-biased sampling

**As a** Service Owner,
**I want** the mesh to always capture traces for requests that result in errors (5xx responses, connection failures),
**so that** I never lose visibility into failures even with aggressive sampling on happy-path traffic.

### 5.2 Latency-biased sampling

**As a** Service Owner,
**I want** the mesh to always capture traces for requests exceeding a latency threshold (e.g., p99 > 2s),
**so that** I can investigate slow requests without setting a high overall sampling rate.

### 5.3 Parent-based sampling decisions

**As a** Mesh Operator,
**I want** mesh proxies to honor upstream sampling decisions (parent-based sampling),
**so that** when an ingress gateway decides to sample a request, all downstream services also sample that trace, giving me complete end-to-end visibility.

### 5.4 Rule-based per-service sampling policies

**As a** Mesh Operator,
**I want** to define different sampling rates per service or per route (e.g., `/health` at 0%, payment service at 10%, everything else at 1%),
**so that** I balance trace coverage against cost across services with different traffic volumes and criticality.

## 6. Self-Service Observability for Service Owners

> [Platform engineers serve as internal advocates building tools that empower dev teams](https://www.cncf.io/blog/2024/12/16/platform-engineering-needs-observability-heres-why/). [78% want observability from their mesh](https://www.cncf.io/reports/cncf-annual-survey-2024/). Service owners need "does my service work?" answers without mesh expertise. Linkerd differentiates with zero-config linkerd-viz dashboards.

### 6.1 Per-service observability defaults without policy authoring

**As a** Service Owner,
**I want** my service to automatically get golden signal metrics (rate, errors, duration) and basic tracing the moment it joins the mesh,
**so that** I have immediate visibility without writing any MeshMetric or MeshTrace policies.

### 6.2 On-demand trace sampling boost

**As a** Service Owner debugging an intermittent issue,
**I want** to temporarily increase the sampling rate for my service (e.g., 100% for 30 minutes) through a simple policy override,
**so that** I capture detailed traces during active debugging without involving the mesh operator or affecting other services.

## 7. Multi-Cluster / Multi-Zone Observability

> Cross-cluster tracing requires custom collector topologies. "A single request might traverse five services across fifteen pods across multiple nodes." Multi-cluster observability is a key differentiator for Gloo Mesh and Google CSM. Kuma's multi-zone architecture is a natural fit.

### 7.1 Cross-zone latency baseline and anomaly detection

**As a** Mesh Operator,
**I want** to see baseline latency for cross-zone traffic and get alerted when latency between specific zones degrades,
**so that** I detect network issues between zones early, before they impact service SLOs.

## 9. SLO/SLI (Service Level Indicator) Observability

> [MTTR is getting worse for 82% of organizations](https://logz.io/observability-pulse-2024/). SRE teams need Service Level Objective (SLO) tracking built into the mesh observability story. Golden signals alone aren't enough - teams need error budgets and burn rates.

### 9.1 SLI metrics from mesh traffic

**As a** Service Owner,
**I want** the mesh to automatically generate SLI metrics (availability = successful requests / total requests, latency = requests below threshold / total) from proxy data,
**so that** I can define SLOs against mesh-derived data without instrumenting my application.

### 9.2 Error budget burn rate dashboards

**As a** Service Owner,
**I want** dashboards showing error budget consumption and burn rate for my services based on mesh-derived SLIs,
**so that** I know when my service is at risk of breaching SLOs before it impacts end users.

### 9.3 SLO-based alerting rules shipped with dashboards

**As a** Mesh Operator,
**I want** pre-built Prometheus alerting rules for multi-window burn rate SLO alerting shipped alongside Kuma dashboards,
**so that** I can adopt SRE best practices (Google SRE book) out of the box without writing complex recording and alerting rules.

## 10. Security and Policy Observability

> [79% of CNCF survey respondents list security as a key mesh driver](https://www.cncf.io/reports/cncf-annual-survey-2024/). mTLS status visibility, policy decision auditing, and RBAC observability are critical for compliance-driven organizations.

### 10.1 mTLS status visibility in dashboards

**As a** Mesh Operator,
**I want** dashboards showing mTLS handshake success/failure rates, certificate expiration timelines, and plaintext-vs-encrypted traffic ratios per service,
**so that** I can verify my zero-trust security posture and catch mTLS misconfigurations before they become incidents.

### 10.2 Policy decision audit trail via access logs

**As a** Mesh Operator in a regulated environment,
**I want** mesh access logs to include which policies (MeshTrafficPermission, MeshRateLimit, MeshFaultInjection) were evaluated and their decisions (allow/deny/rate-limited) for each request,
**so that** I have an audit trail for compliance and can debug unexpected policy behavior.

### 10.3 Traffic permission violations as OTel events

**As a** Mesh Operator,
**I want** denied requests (MeshTrafficPermission violations) emitted as OTel log events (structured log records in the [OpenTelemetry Log Data Model](https://opentelemetry.io/docs/specs/otel/logs/data-model/) representing discrete events with timestamp, severity, body, and attributes) with source/destination identity, policy name, and denial reason,
**so that** I can alert on unauthorized access attempts and investigate them in my centralized log platform.

## 11. Control Plane Observability

> Platform engineers need to monitor the mesh infrastructure itself, not just the services running on it. Istio exposes istiod metrics. Gloo Mesh ships control plane dashboards. Users need mesh health, not just service health.

### 11.1 Control plane performance metrics via OTel

**As a** Mesh Operator,
**I want** Kuma control plane metrics (xDS push latency, config sync time, connected DPPs, policy evaluation time) exported via OTel alongside proxy metrics,
**so that** I monitor mesh infrastructure health through the same pipeline as service telemetry.

### 11.2 Configuration sync status per dataplane

**As a** Mesh Operator,
**I want** to see which dataplanes have stale configurations (pending xDS updates, sync errors) in a dashboard,
**so that** I can identify configuration propagation issues before they cause traffic routing problems.

### 11.3 Zone connectivity and synchronization dashboard

**As a** Mesh Operator managing a multi-zone deployment,
**I want** a dashboard showing zone-to-global connectivity status, KDS sync lag, and resource propagation times,
**so that** I detect zone isolation or control plane split-brain scenarios before they impact traffic.

## Story Index by Priority

### Already implemented

#### MeshMetric

- [1.2](#12-per-environment-telemetry-routing) Per-environment telemetry routing
- [1.4](#14-native-otlp-metric-export-from-proxies) Native OTLP metric export from proxies
- [2.2](#22-metric-filtering-via-allowlistdenylist-patterns) Metric filtering via allowlist/denylist patterns
- [3.2](#32-merged-application--proxy-metrics-endpoint) Merged application + proxy metrics endpoint
- [6.1](#61-per-service-observability-defaults-without-policy-authoring) Per-service observability defaults without policy authoring

#### MeshTrace

- [2.4](#24-per-service-sampling-rate-overrides) Per-service sampling rate overrides

### Partialy done

- [1.3](#13-otel-collector-deployment-guidance-as-part-of-mesh-setup) OTel Collector deployment guidance
  - ✅ simple otel guide
  - ❌ detailed integration with OTEL guidelines
- [11.2](#112-configuration-sync-status-per-dataplane) Configuration sync status per dataplane
  - ✅ Per-dataplane subscription tracking (DataplaneInsight)
  - ✅ Prometheus metrics xds_*
  - ❌ Pending xDS updates queue depth per dataplane
  - ❌ Stale configuration age metric (time since last successful sync)

### Verify if already supported

- [3.3](#33-consistent-resource-attributes-across-all-signals) Consistent resource attributes across all signals
- [4.3](#43-cross-zone-distributed-trace-continuity) Cross-zone distributed trace continuity

### TODO

- [1.1](#11-single-otel-collector-as-telemetry-target-for-all-signals) Single OTel Collector as telemetry target for all signals
- [3.1](#31-access-logs-enriched-with-trace-context) Access logs enriched with trace context
- [11.1](#111-control-plane-performance-metrics-via-otel) Control plane performance metrics via OTel

### TODO new dashboards

- [11.3](#113-zone-connectivity-and-synchronization-dashboard) Zone connectivity and synchronization dashboard
- [7.1](#71-cross-zone-latency-baseline-and-anomaly-detection) Cross-zone latency baseline and anomaly detection
- [9.1](#91-sli-metrics-from-mesh-traffic) -> [9.3](#93-slo-based-alerting-rules-shipped-with-dashboards) SLO/SLI Observability (entire epic 9)
- [10.1](#101-mtls-status-visibility-in-dashboards) -> [10.3](#103-traffic-permission-violations-as-otel-events) Security and Policy Observability (entire epic 10)

### Nice to Have

- [2.1](#21-metric-cardinality-limits-per-policy) Metric cardinality limits per policy
- [2.3](#23-telemetry-cost-estimation-visibility) Telemetry cost estimation visibility
- [3.4](#34-exemplars-linking-metrics-to-traces) Exemplars linking metrics to traces
- [4.2](#42-multi-format-context-propagation) Multi-format context propagation
- [4.4](#44-trace-aware-traffic-routing-diagnostics) Trace-aware traffic routing diagnostics
- [5.1](#51-error-biased-sampling) - [5.4](#54-rule-based-per-service-sampling-policies) Advanced Sampling (entire epic 5)
- [6.2](#62-on-demand-trace-sampling-boost) On-demand trace sampling boost

### WONT DO

- [4.1](#41-automatic-trace-context-injection-for-uninstrumented-services) Automatic trace context injection for uninstrumented services

## Research Sources

### Surveys & Reports

- [CNCF Annual Survey 2024](https://www.cncf.io/reports/cncf-annual-survey-2024/) - 42% mesh adoption, 78% cite observability as key driver
- [Grafana Observability Survey 2024](https://grafana.com/observability-survey/2024/) - 85% investing in OTel, 61% cite cost as top concern
- [Observability Pulse 2024](https://logz.io/observability-pulse-2024/) - 82% MTTR > 1 hour, 76% see OTel as important
- [EMA/Grafana OpenTelemetry Report](https://grafana.com/opentelemetry-report/) - ~50% CNCF end-user companies adopted OTel

### Competitor Analysis

- **Istio**: Most mature OTel tracing via Envoy OTLP; Telemetry CRD for config; metrics remain Prometheus-only; ambient mode gaps at L4
- **Linkerd**: Moved beyond bundled Prometheus; OTel Collector scrapes proxy Prometheus endpoints; proxy never initiates traces
- **Consul Connect**: Merged app+proxy metrics endpoint; lightweight OTel Collector for HCP export; OTel feels bolted-on
- **Cilium**: eBPF L3/L4 observability without sidecars; hubble-otel (OTel export) unmaintained; no distributed tracing
- **Gloo Mesh**: Most OTel-native (entire pipeline is OTel Collector); multi-cluster gateway aggregation; enterprise-only
- **Google CSM**: Zero-config observability to Cloud Monitoring/Trace; native OTLP ingestion (2025); vendor lock-in

### Key Pain Points (Cross-Industry)

1. **Broken traces from context propagation failure** - #1 pain point across all meshes
2. **Metric cardinality / cost explosion** - Envoy 378+ metrics, high-cardinality labels
3. **Multi-cluster trace fragmentation** - traces break at cluster/zone boundaries
4. **Operational complexity** - mesh adoption dropped 50%->42% due to overhead
5. **No consistent OTel semantic conventions for mesh telemetry** - proxy vs app attribute naming
6. **Tail sampling requires complex two-tier collector setup** - most-requested but hardest to implement

### Technical References

- [Observability at the Edge: New OTel features in Envoy/Istio (2024)](https://opentelemetry.io/blog/2024/new-otel-features-envoy-istio/)
- [STCLab: 72% cost reduction with OTel](https://www.cncf.io/blog/2025/12/16/how-to-build-a-cost-effective-observability-platform-with-opentelemetry/)
- [Beyond linkerd-viz: Linkerd with OTel](https://linkerd.io/2025/09/09/linkerd-with-opentelemetry/)
- [Myth: Service mesh can do distributed tracing](https://medium.com/@YuriShkuro/myth-service-mesh-can-do-distributed-tracing-of-your-application-7a5cb5e3b617)
- [OTel Collector deployment patterns](https://opentelemetry.io/docs/collector/deploy/)
- [Tail sampling with OTel](https://opentelemetry.io/blog/2022/tail-sampling/)
- [Platform Engineering needs Observability](https://www.cncf.io/blog/2024/12/16/platform-engineering-needs-observability-heres-why/)
