export interface ApproachInfo {
  path: string;
  label: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
}

export const APPROACHES: ApproachInfo[] = [
  {
    path: "use-state",
    label: "useState",
    description: "React's built-in local state hook",
    advantages: [
      "Zero dependencies — built into React",
      "Minimal boilerplate, easy to learn",
      "Great for simple, isolated component state",
    ],
    disadvantages: [
      "Stale closures require refs for mutable tracking",
      "Multiple related state pieces drift out of sync",
      "No built-in pattern for complex state transitions",
    ],
  },
  {
    path: "use-reducer",
    label: "useReducer",
    description: "React's built-in reducer pattern",
    advantages: [
      "Atomic transitions — reducer always sees full state",
      "Named actions create a vocabulary for what happens",
      "Pure reducer function is easy to test in isolation",
    ],
    disadvantages: [
      "Async side effects still need useEffect escape hatch",
      "More boilerplate than useState for simple cases",
      "No middleware or devtools ecosystem built in",
    ],
  },
  {
    path: "redux",
    label: "Redux",
    description: "Redux Toolkit with slices and async thunks",
    advantages: [
      "Industry-standard with rich devtools and middleware",
      "Immer allows intuitive mutable-style updates",
      "createAsyncThunk handles async lifecycle states",
    ],
    disadvantages: [
      "Significant ceremony — slices, store, provider, thunks",
      "Overkill for local component state",
      "Requires scoped store pattern to avoid global pollution",
    ],
  },
  {
    path: "streams",
    label: "Streams",
    description: "RxJS reactive observable streams",
    advantages: [
      "Declarative pipelines describe data flow elegantly",
      "Operators like pairwise/distinctUntilChanged are powerful",
      "Built-in cancellation and backpressure handling",
    ],
    disadvantages: [
      "Steep learning curve — large operator surface area",
      "Bridging observables into React state adds complexity",
      "Debugging reactive pipelines can be opaque",
    ],
  },
  {
    path: "signals",
    label: "Signals",
    description: "Fine-grained reactivity with @preact/signals",
    advantages: [
      "Fine-grained updates — only affected DOM nodes re-render",
      "Direct .value mutations, no dispatch or actions needed",
      "Computed values with automatic dependency tracking",
    ],
    disadvantages: [
      "Requires Babel transform for automatic React integration",
      "Not native to React — ecosystem fit is evolving",
      "Imperative mutation style loses the structure of actions",
    ],
  },
  {
    path: "xstate",
    label: "XState",
    description: "Explicit state machines and statecharts",
    advantages: [
      "Impossible states are impossible — explicit state modeling",
      "Invoked actors tie async lifecycle to state lifetime",
      "Visual statechart makes the logic inspectable and shareable",
    ],
    disadvantages: [
      "Highest upfront design effort of all approaches",
      "Verbose for simple state that doesn't need explicit modeling",
      "Learning curve around statechart concepts (guards, invoke, always)",
    ],
  },
];
