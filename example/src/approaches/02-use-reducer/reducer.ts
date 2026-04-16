import type { MousePosition, PanelSide, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION, INITIAL_JOKE } from "../../types/state";

export interface State {
  mousePosition: MousePosition;
  currentSide: PanelSide | null;
  previousSide: PanelSide | null;
  crossings: number;
  joke: JokeResult;
}

export type Action =
  | { type: "MOUSE_MOVE"; position: MousePosition; side: PanelSide }
  | { type: "JOKE_LOADING" }
  | { type: "JOKE_SUCCESS"; joke: string }
  | { type: "JOKE_ERROR"; error: string }
  | { type: "RESET" };

export const initialState: State = {
  mousePosition: INITIAL_MOUSE_POSITION,
  currentSide: null,
  previousSide: null,
  crossings: 0,
  joke: INITIAL_JOKE,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "MOUSE_MOVE": {
      const crossed =
        state.currentSide !== null &&
        action.side !== state.currentSide &&
        state.crossings < TARGET_CROSSINGS;

      return {
        ...state,
        mousePosition: action.position,
        previousSide: state.currentSide,
        currentSide: action.side,
        crossings: crossed ? state.crossings + 1 : state.crossings,
      };
    }
    case "JOKE_LOADING":
      return { ...state, joke: { status: "loading" } };
    case "JOKE_SUCCESS":
      return { ...state, joke: { status: "success", joke: action.joke } };
    case "JOKE_ERROR":
      return { ...state, joke: { status: "error", error: action.error } };
    case "RESET":
      return initialState;
  }
}
