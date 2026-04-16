import { ApproachShell } from "../../components/ApproachShell";
import { APPROACHES } from "../../types/approaches";
import { useMouseChallenge } from "./useMouseChallenge";

const info = APPROACHES[1];

export function UseReducerPage() {
  const state = useMouseChallenge();
  return <ApproachShell state={state} title={info.label} description={info.description} advantages={info.advantages} disadvantages={info.disadvantages} />;
}
