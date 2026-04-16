import { useState, useEffect, useCallback, useRef } from "react";
import type { ChallengeState, MousePosition, PanelSide, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION, INITIAL_JOKE } from "../../types/state";
import { getSideFromEvent } from "../../utils/getSide";
import { createChallengePipeline, type ChallengePipeline } from "./challenge$";

export function useMouseChallenge(): ChallengeState {
  // Use state for the pipeline so React re-renders and re-subscribes on reset
  const [pipeline, setPipeline] = useState<ChallengePipeline>(() => createChallengePipeline());

  const [mousePosition, setMousePosition] = useState<MousePosition>(INITIAL_MOUSE_POSITION);
  const [currentSide, setCurrentSide] = useState<PanelSide | null>(null);
  const [crossings, setCrossings] = useState(0);
  const [joke, setJoke] = useState<JokeResult>(INITIAL_JOKE);

  // Subscribe to all observable streams — re-subscribes when pipeline changes
  useEffect(() => {
    const subs = [
      pipeline.position$.subscribe(setMousePosition),
      pipeline.currentSide$.subscribe(setCurrentSide),
      pipeline.crossings$.subscribe(setCrossings),
      pipeline.joke$.subscribe(setJoke),
    ];
    return () => subs.forEach((s) => s.unsubscribe());
  }, [pipeline]);

  // Keep a ref to the current pipeline for the mouse move handler
  const pipelineRef = useRef(pipeline);
  pipelineRef.current = pipeline;

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { position, side } = getSideFromEvent(event);
      pipelineRef.current.mouseMove$.next({ position, side });
    },
    [],
  );

  const onReset = useCallback(() => {
    // Create a fresh pipeline — the effect will re-subscribe
    setPipeline(createChallengePipeline());
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
