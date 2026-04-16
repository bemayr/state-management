import { NavLink } from "react-router-dom";
import { APPROACHES } from "../types/approaches";

export function TabNav() {
  return (
    <nav className="tab-nav">
      {APPROACHES.map((approach) => (
        <NavLink
          key={approach.path}
          to={`/${approach.path}`}
          className={({ isActive }) => `tab-link ${isActive ? "active" : ""}`}
        >
          {approach.label}
        </NavLink>
      ))}
    </nav>
  );
}
