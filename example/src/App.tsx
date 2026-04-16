import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UseStatePage } from "./approaches/01-use-state";
import { UseReducerPage } from "./approaches/02-use-reducer";
import { ReduxPage } from "./approaches/03-redux";
import { StreamsPage } from "./approaches/04-streams";
import { SignalsPage } from "./approaches/05-signals";
import { XStatePage } from "./approaches/06-xstate";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/use-state" replace />} />
          <Route path="use-state" element={<UseStatePage />} />
          <Route path="use-reducer" element={<UseReducerPage />} />
          <Route path="redux" element={<ReduxPage />} />
          <Route path="streams" element={<StreamsPage />} />
          <Route path="signals" element={<SignalsPage />} />
          <Route path="xstate" element={<XStatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
