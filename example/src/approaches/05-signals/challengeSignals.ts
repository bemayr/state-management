import { signal, computed } from "@preact/signals-react";
import type { MousePosition, PanelSide, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION, INITIAL_JOKE } from "../../types/state";

export function createChallengeSignals() {
  const mousePosition = signal<MousePosition>(INITIAL_MOUSE_POSITION);
  const currentSide = signal<PanelSide | null>(null);
  const previousSide = signal<PanelSide | null>(null);
  const crossings = signal(0);
  const joke = signal<JokeResult>(INITIAL_JOKE);

  const isComplete = computed(() => crossings.value >= TARGET_CROSSINGS);

  function reset() {
    mousePosition.value = INITIAL_MOUSE_POSITION;
    currentSide.value = null;
    previousSide.value = null;
    crossings.value = 0;
    joke.value = INITIAL_JOKE;
  }

  return { mousePosition, currentSide, previousSide, crossings, joke, isComplete, reset };
}

export type ChallengeSignals = ReturnType<typeof createChallengeSignals>;
