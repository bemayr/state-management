import { useRef } from "react";
import type { MousePosition, PanelSide } from "../types/state";

interface ChallengePanelProps {
  mousePosition: MousePosition;
  currentSide: PanelSide | null;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function ChallengePanel({ mousePosition, currentSide, onMouseMove }: ChallengePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="challenge-panel" ref={containerRef} onMouseMove={onMouseMove}>
      <div className={`panel-half panel-left ${currentSide === "left" ? "active" : ""}`}>
        <span className="panel-label">LEFT</span>
      </div>
      <div className="panel-divider" />
      <div className={`panel-half panel-right ${currentSide === "right" ? "active" : ""}`}>
        <span className="panel-label">RIGHT</span>
      </div>
      {currentSide && (
        <div
          className="mouse-dot"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        />
      )}
    </div>
  );
}
