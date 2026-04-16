export interface ApproachInfo {
  path: string;
  label: string;
  description: string;
}

export const APPROACHES: ApproachInfo[] = [
  { path: "use-state", label: "useState", description: "React's built-in local state hook" },
  { path: "use-reducer", label: "useReducer", description: "React's built-in reducer pattern" },
  { path: "redux", label: "Redux", description: "Redux Toolkit with slices and async thunks" },
  { path: "streams", label: "Streams", description: "RxJS reactive observable streams" },
  { path: "signals", label: "Signals", description: "Fine-grained reactivity with @preact/signals" },
  { path: "xstate", label: "XState", description: "Explicit state machines and statecharts" },
];
