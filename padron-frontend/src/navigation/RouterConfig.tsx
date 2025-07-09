import { Routes, Route } from "react-router";
import { URLS } from "./CONTANTS";
import { LoginForm } from "../pages/LoginForm";
import { AdminPadron } from "../pages/AdminPadron";
import { ConsultaPadron } from "../pages/ConsultaPadron";

const RouterConfig = () => (
  <Routes>
    <Route path={URLS.LOGIN} element={<LoginForm />} />
    <Route path={URLS.ADMIN_PADRON} element={<AdminPadron />} />
    <Route path={URLS.CONSULTA_PADRON} element={<ConsultaPadron />} />
  </Routes>
);

export default RouterConfig;
