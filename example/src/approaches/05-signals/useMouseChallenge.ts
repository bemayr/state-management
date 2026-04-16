import { useRef, useEffect, useCallback } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import type { ChallengeState } from "../../types/state";
import { TARGET_CROSSINGS } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { fetchDadJoke } from "../../api/fetchJoke";
import { createChallengeSignals, type ChallengeSignals } from "./challengeSignals";

export function useMouseChallenge(): ChallengeState {
  useSignals();

  const signalsRef = useRef<ChallengeSignals | null>(null);
  if (signalsRef.current === null) {
    signalsRef.current = createChallengeSignals();
  }
  const s = signalsRef.current;

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { position, side } = getSideFromEvent(event);
      s.mousePosition.value = position;

      const prev = s.currentSide.value;
      if (prev !== null && side !== prev && s.crossings.value < TARGET_CROSSINGS) {
        s.crossings.value += 1;
      }
      s.previousSide.value = s.currentSide.value;
      s.currentSide.value = side;
    },
    [s],
  );

  // Watch crossings and trigger fetch
  useEffect(() => {
    // Check on every render if crossings reached target
    if (s.crossings.value < TARGET_CROSSINGS) return;
    if (s.joke.value.status !== "idle") return;

    let cancelled = false;
    s.joke.value = { status: "loading", joke: null, error: null };

    fetchDadJoke()
      .then((joke) => {
        if (!cancelled) s.joke.value = { status: "success", joke, error: null };
      })
      .catch((err) => {
        if (!cancelled) s.joke.value = { status: "error", joke: null, error: (err as Error).message };
      });

    return () => { cancelled = true; };
  });

  const onReset = useCallback(() => s.reset(), [s]);

  return {
    mousePosition: s.mousePosition.value,
    currentSide: s.currentSide.value,
    crossings: s.crossings.value,
    isComplete: s.isComplete.value,
    joke: s.joke.value,
    onMouseMove,
    onReset,
  };
}
