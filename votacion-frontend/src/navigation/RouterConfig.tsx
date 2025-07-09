import { Routes, Route } from "react-router";
import { URLS } from "./CONTANTS";
import { LoginForm } from "../pages/LoginForm";
import {ValidarVotante} from "../pages/ValidarVotante";



const RouterConfig = () => (
  <Routes>
    <Route path={URLS.LOGIN} element={<LoginForm />} />
    <Route path={URLS.VALIDAR_VOTANTE} element={<ValidarVotante />} />





  </Routes>
);

export default RouterConfig;
