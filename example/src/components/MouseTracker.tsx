import type { MousePosition, PanelSide } from "../types/state";

interface MouseTrackerProps {
  position: MousePosition;
  side: PanelSide | null;
}

export function MouseTracker({ position, side }: MouseTrackerProps) {
  return (
    <div className="mouse-tracker">
      <span className="tracker-coord">
        x: <strong>{position.x}</strong>
      </span>
      <span className="tracker-coord">
        y: <strong>{position.y}</strong>
      </span>
      <span className="tracker-side">
        side: <strong>{side ?? "—"}</strong>
      </span>
    </div>
  );
}
