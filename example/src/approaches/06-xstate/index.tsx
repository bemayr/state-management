import { ApproachShell } from "../../components/ApproachShell";
import { APPROACHES } from "../../types/approaches";
import { useMouseChallenge } from "./useMouseChallenge";
import { Inspector } from "./Inspector";

const info = APPROACHES[5];

export function XStatePage() {
  const state = useMouseChallenge();

  return (
    <>
      <ApproachShell state={state} title={info.label} description={info.description} />
      <Inspector
        stateValue={state.stateValue}
        context={state.context}
        log={state.inspectorLog}
      />
    </>
  );
}
