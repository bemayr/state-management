import type { PanelSide, MousePosition } from "../types/state";

export function getSideFromEvent(event: React.MouseEvent<HTMLDivElement>): {
  position: MousePosition;
  side: PanelSide;
} {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const midpoint = rect.width / 2;
  const side: PanelSide = x < midpoint ? "left" : "right";
  return { position: { x, y }, side };
}
