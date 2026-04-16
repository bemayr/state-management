import { useCallback, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import type { InspectionEvent } from "xstate";
import type { ChallengeState, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { challengeMachine } from "./challengeMachine";

export interface InspectorEntry {
  id: number;
  timestamp: number;
  event: InspectionEvent;
}

export interface XStateChallengeState extends ChallengeState {
  stateValue: string;
  context: Record<string, unknown>;
  inspectorLog: InspectorEntry[];
}

let entryId = 0;

export function useMouseChallenge(): XStateChallengeState {
  const [inspectorLog, setInspectorLog] = useState<InspectorEntry[]>([]);
  const logRef = useRef(inspectorLog);
  logRef.current = inspectorLog;

  const [snapshot, send] = useMachine(challengeMachine, {
    inspect: (event) => {
      // Skip high-frequency mouse move snapshot events to keep the log readable
      if (
        event.type === "@xstate.snapshot" &&
        event.event.type === "MOUSE_MOVE"
      ) {
        return;
      }
      const entry: InspectorEntry = {
        id: ++entryId,
        timestamp: Date.now(),
        event,
      };
      const next = [...logRef.current, entry].slice(-50);
      setInspectorLog(next);
    },
  });

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { position, side } = getSideFromEvent(event);
      send({ type: "MOUSE_MOVE", position, side });
    },
    [send],
  );

  const onReset = useCallback(() => {
    send({ type: "RESET" });
    setInspectorLog([]);
  }, [send]);

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

  // Prepare a clean context view (exclude mousePosition for readability)
  const { mousePosition: _, ...displayContext } = snapshot.context;

  return {
    mousePosition: snapshot.context.mousePosition,
    currentSide: snapshot.context.currentSide,
    crossings: snapshot.context.crossings,
    isComplete: snapshot.context.crossings >= TARGET_CROSSINGS,
    joke,
    onMouseMove,
    onReset,
    stateValue: JSON.stringify(snapshot.value),
    context: displayContext as Record<string, unknown>,
    inspectorLog,
  };
}
