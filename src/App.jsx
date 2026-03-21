import { Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import HomePage from "./pages/Home/HomePage";
import StatsPage from "./pages/Stats/StatsPage";
import JournalPage from "./pages/Journal/JournalPage";
import { ROUTES } from "./constants/routes";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.STATS} element={<StatsPage />} />
        <Route path={ROUTES.JOURNAL} element={<JournalPage />} />
      </Routes>
    </AppShell>
  );
}