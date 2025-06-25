import { Routes, Route } from "react-router";
import { URLS } from "./CONTANTS";
import { LoginForm } from "../pages/LoginForm";
import { AdminUsuarios } from "../pages/AdminUsuarios";

const RouterConfig = () => (
  <Routes>
    <Route path={URLS.LOGIN} element={<LoginForm />} />
    <Route path={URLS.USUARIOS_ADMIN} element={<AdminUsuarios />} />

  </Routes>
);

export default RouterConfig;