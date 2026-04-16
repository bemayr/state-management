import {
  Subject,
  map,
  distinctUntilChanged,
  pairwise,
  scan,
  filter,
  switchMap,
  startWith,
  catchError,
  of,
  from,
  merge,
  shareReplay,
  take,
} from "rxjs";
import type { MousePosition, PanelSide, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION, INITIAL_JOKE } from "../../types/state";
import { fetchDadJoke } from "../../api/fetchJoke";

interface MouseMoveEvent {
  position: MousePosition;
  side: PanelSide;
}

export function createChallengePipeline() {
  const mouseMove$ = new Subject<MouseMoveEvent>();
  const reset$ = new Subject<void>();

  // Mouse position stream — just pass through
  const position$ = merge(
    mouseMove$.pipe(map((m) => m.position)),
    reset$.pipe(map(() => INITIAL_MOUSE_POSITION)),
  ).pipe(shareReplay(1));

  // Current side stream
  const currentSide$ = merge(
    mouseMove$.pipe(map((m) => m.side)),
    reset$.pipe(map(() => null as PanelSide | null)),
  ).pipe(shareReplay(1));

  // Crossings: detect side changes, count them, reset on reset$
  const crossings$ = merge(
    mouseMove$.pipe(
      map((m) => m.side),
      distinctUntilChanged(),
      pairwise(),
      filter(([prev, curr]) => prev !== curr),
      map(() => 1 as const), // each crossing is +1
    ),
    reset$.pipe(map(() => 0 as const)), // 0 means reset
  ).pipe(
    scan((count, value) => (value === 0 ? 0 : Math.min(count + 1, TARGET_CROSSINGS)), 0),
    startWith(0),
    shareReplay(1),
  );

  // Joke: triggered when crossings reach target
  const joke$ = crossings$.pipe(
    filter((count) => count === TARGET_CROSSINGS),
    take(1), // only fetch once per "session"
    switchMap(() =>
      from(fetchDadJoke()).pipe(
        map((joke): JokeResult => ({ status: "success", joke, error: null })),
        startWith({ status: "loading", joke: null, error: null } as JokeResult),
        catchError((err) =>
          of({ status: "error", joke: null, error: (err as Error).message } as JokeResult),
        ),
      ),
    ),
    startWith(INITIAL_JOKE),
    shareReplay(1),
  );

  return {
    mouseMove$,
    reset$,
    position$,
    currentSide$,
    crossings$,
    joke$,
  };
}

export type ChallengePipeline = ReturnType<typeof createChallengePipeline>;
