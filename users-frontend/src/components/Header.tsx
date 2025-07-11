import { useNavigate } from "react-router-dom";
import { URLS } from "../navigation/CONTANTS";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate(URLS.LOGIN);
  };

  return (
    <header className="bg-gray-800 text-white shadow py-4 px-6 flex items-center justify-between">
      <h1 className="text-lg font-bold">Sistema de Gestión de Usuarios y Accesos</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
      >
        Cerrar sesión
      </button>
    </header>
  );
};
