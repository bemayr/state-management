import { useEffect, useRef } from "react";
import type { InspectorEntry } from "./useMouseChallenge";

interface InspectorProps {
  stateValue: string;
  context: Record<string, unknown>;
  log: InspectorEntry[];
}

function formatEvent(entry: InspectorEntry): { label: string; detail: string; color: string } {
  const e = entry.event;
  switch (e.type) {
    case "@xstate.snapshot":
      return {
        label: "snapshot",
        detail: `after ${e.event.type}`,
        color: "var(--color-accent)",
      };
    case "@xstate.event":
      return {
        label: "event",
        detail: e.event.type,
        color: "#22863a",
      };
    case "@xstate.actor":
      return {
        label: "actor",
        detail: "registered",
        color: "#0366d6",
      };
    case "@xstate.microstep":
      return {
        label: "microstep",
        detail: e._transitions.map((t) => t.eventType).join(", "),
        color: "#6f42c1",
      };
    case "@xstate.action":
      return {
        label: "action",
        detail: e.action.type,
        color: "#b08800",
      };
    default:
      return { label: "unknown", detail: "", color: "var(--color-text-muted)" };
  }
}

export function Inspector({ stateValue, context, log }: InspectorProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log.length]);

  return (
    <div className="inspector">
      <div className="inspector-header">
        <span className="inspector-badge">Inspector</span>
      </div>

      <div className="inspector-sections">
        <div className="inspector-section">
          <div className="inspector-section-title">State</div>
          <div className="inspector-state-value">{stateValue}</div>
        </div>

        <div className="inspector-section">
          <div className="inspector-section-title">Context</div>
          <pre className="inspector-context">
            {JSON.stringify(context, null, 2)}
          </pre>
        </div>

        <div className="inspector-section">
          <div className="inspector-section-title">Event Log</div>
          <div className="inspector-log">
            {log.length === 0 && (
              <div className="inspector-empty">No events yet — move your mouse</div>
            )}
            {log.map((entry) => {
              const { label, detail, color } = formatEvent(entry);
              return (
                <div key={entry.id} className="inspector-log-entry">
                  <span className="inspector-log-type" style={{ color }}>
                    {label}
                  </span>
                  <span className="inspector-log-detail">{detail}</span>
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
