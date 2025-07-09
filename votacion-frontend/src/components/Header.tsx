import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { URLS } from "../navigation/CONTANTS";

const links = [
  { to: URLS.VALIDAR_VOTANTE, label: "Validar Votante" },
  { to: URLS.CABINA, label: "Cabina de Votación" },
  { to: URLS.ADMIN_MONITOREO, label: "Monitoreo" },
  { to: URLS.VER_VOTOS, label: "Resultados Públicos" },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate(URLS.LOGIN);
  };

  return (
    <nav className="bg-gray-800 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">Sistema de Votación</div>

        {/* Menú escritorio */}
        <div className="hidden md:flex gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 rounded hover:bg-gray-700 text-sm ${
                location.pathname === link.to ? "bg-blue-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="hidden md:inline-block bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
        >
          Cerrar sesión
        </button>

        {/* Botón hamburguesa en móviles */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-gray-700 px-4 pb-4">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuAbierto(false)}
                className={`block px-3 py-2 rounded text-sm ${
                  location.pathname === link.to ? "bg-blue-600" : "hover:bg-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm text-left"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
