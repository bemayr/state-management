export type PanelSide = "left" | "right";

export interface MousePosition {
  x: number;
  y: number;
}

export interface JokeResult {
  status: "idle" | "loading" | "success" | "error";
  joke: string | null;
  error: string | null;
}

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
  joke: null,
  error: null,
};
