import { useReducer, useEffect, useCallback } from "react";
import type { ChallengeState } from "../../types/state";
import { TARGET_CROSSINGS } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { fetchDadJoke } from "../../api/fetchJoke";
import { reducer, initialState } from "./reducer";

export function useMouseChallenge(): ChallengeState {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { position, side } = getSideFromEvent(event);
    dispatch({ type: "MOUSE_MOVE", position, side });
  }, []);

  // The reducer handles crossing detection atomically — no refs needed.
  // We only need this effect to trigger the async fetch.
  useEffect(() => {
    if (state.crossings < TARGET_CROSSINGS) return;

    let cancelled = false;
    dispatch({ type: "JOKE_LOADING" });

    fetchDadJoke()
      .then((joke) => {
        if (!cancelled) dispatch({ type: "JOKE_SUCCESS", joke });
      })
      .catch((err) => {
        if (!cancelled) dispatch({ type: "JOKE_ERROR", error: (err as Error).message });
      });

    return () => { cancelled = true; };
  }, [state.crossings]);

  const onReset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
    mousePosition: state.mousePosition,
    currentSide: state.currentSide,
    crossings: state.crossings,
    isComplete: state.crossings >= TARGET_CROSSINGS,
    joke: state.joke,
    onMouseMove,
    onReset,
  };
}
