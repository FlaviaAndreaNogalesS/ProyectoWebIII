import { Link, useNavigate } from "react-router-dom";
import { URLS } from "../navigation/CONTANTS";

export const AdminMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate(URLS.LOGIN);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">Padrón Electoral Bolivia</div>
        <div className="flex gap-6 text-sm">
          <Link to={URLS.USUARIOS_ADMIN} className="hover:underline">Usuarios</Link>
          <Link to={URLS.ADMIN_PADRON} className="hover:underline">Admin Padrón</Link>
          <Link to={URLS.CONSULTA_PADRON} className="hover:underline">Consulta</Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
