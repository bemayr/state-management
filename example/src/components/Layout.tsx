import { Outlet } from "react-router-dom";
import { TabNav } from "./TabNav";

export function Layout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1 className="layout-title">State Management</h1>
        <TabNav />
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
