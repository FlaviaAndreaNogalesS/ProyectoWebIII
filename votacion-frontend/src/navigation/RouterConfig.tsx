import { Routes, Route } from "react-router";
import { URLS } from "./CONTANTS";
import { LoginForm } from "../pages/LoginForm";
import {ValidarVotante} from "../pages/ValidarVotante";
import { CabinaVotacion } from "../pages/CabinaVotacion";
import { AdminMonitoreo} from "../pages/AdminMonitoreo";
import { VerVotosPublico } from "../pages/VerVotosPublico";

const RouterConfig = () => (
  <Routes>
    <Route path={URLS.LOGIN} element={<LoginForm />} />
    <Route path={URLS.VALIDAR_VOTANTE} element={<ValidarVotante />} />
    <Route path={URLS.CABINA} element={<CabinaVotacion />} />
    <Route path={URLS.ADMIN_MONITOREO} element={<AdminMonitoreo />} />
    <Route path={URLS.VER_VOTOS} element={<VerVotosPublico />} />
  </Routes>
);

export default RouterConfig;
