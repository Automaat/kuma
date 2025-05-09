package externalservices_test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"

	"github.com/kumahq/kuma/pkg/test"
	"github.com/kumahq/kuma/test/e2e/zoneegress/externalservices"
	"github.com/kumahq/kuma/test/framework/report"
)

func TestE2E(t *testing.T) {
	test.RunE2ESpecs(t, "E2E ZoneEgress for ExternalServices Suite")
}

var (
	_ = ReportAfterSuite("report suite", report.DumpReport)
	_ = Describe("Test ZoneEgress for External Services in Hybrid Multizone", Label("job-1"), externalservices.HybridUniversalGlobal, Ordered)
)
