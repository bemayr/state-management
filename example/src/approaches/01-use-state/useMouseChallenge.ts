import { useState, useRef, useEffect, useCallback } from "react";
import type { ChallengeState, PanelSide, MousePosition, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION, INITIAL_JOKE } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { fetchDadJoke } from "../../api/fetchJoke";

export function useMouseChallenge(): ChallengeState {
  const [mousePosition, setMousePosition] = useState<MousePosition>(INITIAL_MOUSE_POSITION);
  const [currentSide, setCurrentSide] = useState<PanelSide | null>(null);
  const [crossings, setCrossings] = useState(0);
  const [joke, setJoke] = useState<JokeResult>(INITIAL_JOKE);

  // Need a ref to track the previous side because useState setters
  // see stale closures inside the onMouseMove callback
  const previousSideRef = useRef<PanelSide | null>(null);
  const crossingsRef = useRef(0);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { position, side } = getSideFromEvent(event);
    setMousePosition(position);
    setCurrentSide(side);

    const prevSide = previousSideRef.current;
    if (prevSide !== null && side !== prevSide && crossingsRef.current < TARGET_CROSSINGS) {
      const next = crossingsRef.current + 1;
      crossingsRef.current = next;
      setCrossings(next);
    }
    previousSideRef.current = side;
  }, []);

  useEffect(() => {
    if (crossings < TARGET_CROSSINGS) return;

    let cancelled = false;
    setJoke({ status: "loading" });

    fetchDadJoke()
      .then((jokeText) => {
        if (!cancelled) setJoke({ status: "success", joke: jokeText });
      })
      .catch((err) => {
        if (!cancelled) setJoke({ status: "error", error: (err as Error).message });
      });

    return () => { cancelled = true; };
  }, [crossings]);

  const onReset = useCallback(() => {
    setMousePosition(INITIAL_MOUSE_POSITION);
    setCurrentSide(null);
    setCrossings(0);
    setJoke(INITIAL_JOKE);
    previousSideRef.current = null;
    crossingsRef.current = 0;
  }, []);

  return {
    mousePosition,
    currentSide,
    crossings,
    isComplete: crossings >= TARGET_CROSSINGS,
    joke,
    onMouseMove,
    onReset,
  };
}
