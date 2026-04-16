import { TARGET_CROSSINGS } from "../types/state";

interface ProgressIndicatorProps {
  crossings: number;
  isComplete: boolean;
}

export function ProgressIndicator({ crossings, isComplete }: ProgressIndicatorProps) {
  return (
    <div className="progress-indicator">
      <div className="progress-dots">
        {Array.from({ length: TARGET_CROSSINGS }, (_, i) => (
          <div
            key={i}
            className={`progress-dot ${i < crossings ? "filled" : ""}`}
          />
        ))}
      </div>
      <span className="progress-text">
        {isComplete
          ? "Challenge complete!"
          : `${crossings} / ${TARGET_CROSSINGS} crossings`}
      </span>
    </div>
  );
}
