import { useMemo } from "react";
import { Provider } from "react-redux";
import { ApproachShell } from "../../components/ApproachShell";
import { APPROACHES } from "../../types/approaches";
import { createChallengeStore } from "./store";
import { useMouseChallenge } from "./useMouseChallenge";

const info = APPROACHES[2];

function ReduxChallenge() {
  const state = useMouseChallenge();
  return <ApproachShell state={state} title={info.label} description={info.description} advantages={info.advantages} disadvantages={info.disadvantages} />;
}

export function ReduxPage() {
  // Scoped store: created fresh each time this route mounts
  const store = useMemo(() => createChallengeStore(), []);

  return (
    <Provider store={store}>
      <ReduxChallenge />
    </Provider>
  );
}
