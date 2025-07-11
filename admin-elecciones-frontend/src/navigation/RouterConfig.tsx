import { Routes, Route } from "react-router";
import { URLS } from "./CONTANTS";
import { LoginForm } from "../pages/LoginForm";
import { AdminElecciones } from "../pages/AdminElecciones";
import { AdminCargos } from "../pages/AdminCargos"; 
import { AdminRecintos } from "../pages/AdminRecintos";
import { DistribucionMesas } from "../pages/DistribucionMesas";
import { AsignarJurados } from "../pages/AsignarJurados"; 
import { AdminCandidaturas } from "../pages/AdminCandidaturas";
import { Papeleta } from "../pages/Papeleta";
import { AdminSecciones } from "../pages/AdminSecciones";
import { AdminTipoEleccion } from "../pages/AdminTipoEleccion";


const RouterConfig = () => (
  <Routes>
    <Route path={URLS.LOGIN} element={<LoginForm />} />
    <Route path={URLS.ELECCIONES_ADMIN} element={<AdminElecciones />} />
    <Route path={URLS.CARGOS_ADMIN} element={<AdminCargos />} />
    <Route path={URLS.RECINTOS_ADMIN} element={<AdminRecintos />} /> 
    <Route path={URLS.DISTRIBUCION_MESAS} element={<DistribucionMesas />} />
    <Route path={URLS.ASIGNAR_JURADOS} element={<AsignarJurados />}/>
    <Route path={URLS.CANDIDATURAS_ADMIN} element={<AdminCandidaturas />} />
    <Route path={URLS.PAPELETA} element={<Papeleta />} />
    <Route path={URLS.SECCIONES_ADMIN} element={<AdminSecciones />} />
    <Route path={URLS.TIPO_ELECCION_ADMIN} element={<AdminTipoEleccion />} />

  </Routes>
);

export default RouterConfig;
