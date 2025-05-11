import { Routes, Route, Outlet } from "react-router-dom";
import { InicialAdm } from "./Pages/InicialAdm";
import { LandingPageAdm } from "./Pages/LandingPageAdm";
import GaleriaAdm from "./Pages/GaleriaAdm";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

export function Router() {
  return (
    <Routes>
      <Route element={<ProtectedRoute><AdminLayout><Outlet /></AdminLayout></ProtectedRoute>}>
        <Route path="/" element={<InicialAdm />} />
        <Route path="/landingPage" element={<LandingPageAdm/>} />
        <Route path="/galeria" element={<GaleriaAdm/>} />
      </Route>
    </Routes>
  );
}
