import { Routes, Route, Outlet } from "react-router-dom";
import { InicialAdm } from "./Pages/InicialAdm";
import { LandingPageAdm } from "./Pages/LandingPageAdm";
import GaleriaAdm from "./Pages/GaleriaAdm";
import { Configuracoes } from "./Pages/Configuracoes";
import { AdminLayout } from "./layouts/AdminLayout";

export function Router() {
  return (
    <Routes>
      <Route element={<AdminLayout><Outlet /></AdminLayout>}>
        <Route path="/" element={<InicialAdm />} />
        <Route path="/landingPage" element={<LandingPageAdm/>} />
        <Route path="/galeria" element={<GaleriaAdm/>} />
        <Route path="/configuracoes" element={<Configuracoes/>} />
      </Route>
    </Routes>
  );
}
