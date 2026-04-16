import { useCallback } from "react";
import { useMachine } from "@xstate/react";
import type { ChallengeState, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { challengeMachine } from "./challengeMachine";

export function useMouseChallenge(): ChallengeState {
  const [snapshot, send] = useMachine(challengeMachine);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { position, side } = getSideFromEvent(event);
      send({ type: "MOUSE_MOVE", position, side });
    },
    [send],
  );

  const onReset = useCallback(() => send({ type: "RESET" }), [send]);

  // Derive joke status from the machine's current state
  let joke: JokeResult;
  if (snapshot.matches("fetchingJoke")) {
    joke = { status: "loading", joke: null, error: null };
  } else if (snapshot.matches("complete")) {
    joke = { status: "success", joke: snapshot.context.joke, error: null };
  } else if (snapshot.matches("error")) {
    joke = { status: "error", joke: null, error: snapshot.context.error };
  } else {
    joke = { status: "idle", joke: null, error: null };
  }

  return {
    mousePosition: snapshot.context.mousePosition,
    currentSide: snapshot.context.currentSide,
    crossings: snapshot.context.crossings,
    isComplete: snapshot.context.crossings >= TARGET_CROSSINGS,
    joke,
    onMouseMove,
    onReset,
  };
}
