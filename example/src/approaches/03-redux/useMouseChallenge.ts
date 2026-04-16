import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { ChallengeState } from "../../types/state";
import { TARGET_CROSSINGS } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { mouseMove, reset, fetchJokeThunk } from "./challengeSlice";
import type { RootState, AppDispatch } from "./store";

export function useMouseChallenge(): ChallengeState {
  const dispatch = useDispatch<AppDispatch>();
  const challenge = useSelector((state: RootState) => state.challenge);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { position, side } = getSideFromEvent(event);
      dispatch(mouseMove({ position, side }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (challenge.crossings >= TARGET_CROSSINGS && challenge.joke.status === "idle") {
      dispatch(fetchJokeThunk());
    }
  }, [challenge.crossings, challenge.joke.status, dispatch]);

  const onReset = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    mousePosition: challenge.mousePosition,
    currentSide: challenge.currentSide,
    crossings: challenge.crossings,
    isComplete: challenge.crossings >= TARGET_CROSSINGS,
    joke: challenge.joke,
    onMouseMove,
    onReset,
  };
}
