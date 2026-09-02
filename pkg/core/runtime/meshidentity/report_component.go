package meshidentity

import (
	"context"
	"time"

	"github.com/kumahq/kuma/v3/pkg/core"
	diagnostics "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshidentity/diagnostics"
	"github.com/kumahq/kuma/v3/pkg/events"
)

var log = core.Log.WithName("meshidentity").WithName("report")

type ReportComponent struct {
	Analyzer *diagnostics.Analyzer
	EventBus events.EventBus
}

func (r *ReportComponent) NeedLeaderElection() bool {
	return true
}

func (r *ReportComponent) Start(stop <-chan struct{}) error {
	if err := r.logReport(); err != nil {
		log.Error(err, "failed to analyze mesh identity migration report")
	}

	listener := r.EventBus.Subscribe(func(event events.Event) bool {
		_, ok := event.(events.ResourceChangedEvent)
		return ok
	})
	defer listener.Close()

	var debounce <-chan time.Time
	for {
		select {
		case <-stop:
			return nil
		case <-listener.Recv():
			debounce = time.After(200 * time.Millisecond)
		case <-debounce:
			debounce = nil
			if err := r.logReport(); err != nil {
				log.Error(err, "failed to analyze mesh identity migration report")
			}
		}
	}
}

func (r *ReportComponent) logReport() error {
	report, err := r.Analyzer.Analyze(context.Background())
	if err != nil {
		return err
	}
	for _, issue := range report.Issues {
		log.Info(issue.Message, "mesh", issue.Mesh, "code", issue.Code)
	}
	return nil
}
