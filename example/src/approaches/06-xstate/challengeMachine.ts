import { setup, assign, fromPromise } from "xstate";
import type { MousePosition, PanelSide } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION } from "../../types/state";
import { fetchDadJoke } from "../../api/fetchJoke";

interface ChallengeContext {
  mousePosition: MousePosition;
  currentSide: PanelSide | null;
  previousSide: PanelSide | null;
  crossings: number;
  joke: string | null;
  error: string | null;
}

type ChallengeEvent =
  | { type: "MOUSE_MOVE"; position: MousePosition; side: PanelSide }
  | { type: "RESET" };

const initialContext: ChallengeContext = {
  mousePosition: INITIAL_MOUSE_POSITION,
  currentSide: null,
  previousSide: null,
  crossings: 0,
  joke: null,
  error: null,
};

export const challengeMachine = setup({
  types: {
    context: {} as ChallengeContext,
    events: {} as ChallengeEvent,
  },
  actors: {
    fetchJoke: fromPromise(async () => fetchDadJoke()),
  },
  guards: {
    hasCrossed: ({ context, event }) => {
      if (event.type !== "MOUSE_MOVE") return false;
      return context.currentSide !== null && event.side !== context.currentSide;
    },
    reachedTarget: ({ context }) => context.crossings >= TARGET_CROSSINGS,
    notReachedTarget: ({ context }) => context.crossings < TARGET_CROSSINGS,
  },
  actions: {
    updateMousePosition: assign(({ context, event }) => {
      if (event.type !== "MOUSE_MOVE") return {};
      return {
        mousePosition: event.position,
        previousSide: context.currentSide,
        currentSide: event.side,
      };
    }),
    incrementCrossings: assign({
      crossings: ({ context }) => context.crossings + 1,
    }),
    resetContext: assign(() => initialContext),
  },
}).createMachine({
  id: "mouseChallenge",
  initial: "tracking",
  context: initialContext,
  states: {
    tracking: {
      on: {
        MOUSE_MOVE: [
          {
            guard: "hasCrossed",
            actions: ["updateMousePosition", "incrementCrossings"],
            target: "checkingCompletion",
          },
          {
            actions: "updateMousePosition",
          },
        ],
        RESET: { actions: "resetContext" },
      },
    },
    checkingCompletion: {
      always: [
        { guard: "reachedTarget", target: "fetchingJoke" },
        { guard: "notReachedTarget", target: "tracking" },
      ],
    },
    fetchingJoke: {
      invoke: {
        src: "fetchJoke",
        onDone: {
          target: "complete",
          actions: assign({ joke: ({ event }) => event.output }),
        },
        onError: {
          target: "error",
          actions: assign({ error: ({ event }) => (event.error as Error).message }),
        },
      },
      on: {
        MOUSE_MOVE: {
          actions: "updateMousePosition",
        },
      },
    },
    complete: {
      on: {
        RESET: { target: "tracking", actions: "resetContext" },
        MOUSE_MOVE: { actions: "updateMousePosition" },
      },
    },
    error: {
      on: {
        RESET: { target: "tracking", actions: "resetContext" },
        MOUSE_MOVE: { actions: "updateMousePosition" },
      },
    },
  },
});
