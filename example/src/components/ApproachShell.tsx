import type { ChallengeState } from "../types/state";
import { ChallengePanel } from "./ChallengePanel";
import { MouseTracker } from "./MouseTracker";
import { ProgressIndicator } from "./ProgressIndicator";
import { JokeDisplay } from "./JokeDisplay";

interface ApproachShellProps {
  state: ChallengeState;
  title: string;
  description: string;
}

export function ApproachShell({ state, title, description }: ApproachShellProps) {
  return (
    <div className="approach-shell">
      <div className="approach-header">
        <h2 className="approach-title">{title}</h2>
        <p className="approach-description">{description}</p>
      </div>

      <ChallengePanel
        mousePosition={state.mousePosition}
        currentSide={state.currentSide}
        onMouseMove={state.onMouseMove}
      />

      <div className="approach-info">
        <MouseTracker position={state.mousePosition} side={state.currentSide} />
        <ProgressIndicator crossings={state.crossings} isComplete={state.isComplete} />
      </div>

      <JokeDisplay joke={state.joke} />

      {(state.crossings > 0 || state.joke.status !== "idle") && (
        <button className="reset-button" onClick={state.onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
