import { ApproachShell } from "../../components/ApproachShell";
import { APPROACHES } from "../../types/approaches";
import { useMouseChallenge } from "./useMouseChallenge";

const info = APPROACHES[3];

export function StreamsPage() {
  const state = useMouseChallenge();
  return <ApproachShell state={state} title={info.label} description={info.description} />;
}
