export type PanelSide = "left" | "right";

export interface MousePosition {
  x: number;
  y: number;
}

interface IdleJokeResult {
  status: "idle"
}

interface LoadingJokeResult {
  status: "loading"
}

interface SuccessJokeResult {
  status: "success",
  joke: string
}

interface ErrorJokeResult {
  status: "error",
  error: string
}

export type JokeResult = IdleJokeResult | LoadingJokeResult | SuccessJokeResult | ErrorJokeResult

/** The universal interface every approach's hook must return */
export interface ChallengeState {
  mousePosition: MousePosition;
  currentSide: PanelSide | null;
  crossings: number;
  isComplete: boolean;
  joke: JokeResult;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onReset: () => void;
}

export const TARGET_CROSSINGS = 3;

export const INITIAL_MOUSE_POSITION: MousePosition = { x: 0, y: 0 };

export const INITIAL_JOKE: JokeResult = {
  status: "idle",
};
