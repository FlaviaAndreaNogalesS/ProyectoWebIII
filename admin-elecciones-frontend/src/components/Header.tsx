import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { URLS } from "../navigation/CONTANTS";

const links = [
  { to: URLS.ELECCIONES_ADMIN, label: "Elecciones" },
  { to: URLS.CARGOS_ADMIN, label: "Cargos" },
  { to: URLS.SECCIONES_ADMIN, label: "Secciones" },
  { to: URLS.RECINTOS_ADMIN, label: "Recintos" },
  { to: URLS.DISTRIBUCION_MESAS, label: "Mesas" },
  { to: URLS.ASIGNAR_JURADOS, label: "Jurados" },
  { to: URLS.CANDIDATURAS_ADMIN, label: "Candidaturas" },
  { to: URLS.PAPELETA, label: "Papeleta" },
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
        <div className="text-lg font-bold">Padrón Electoral Bolivia</div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >

            {menuAbierto ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}

          </svg>
        </button>

        {/* Menú horizontal (pantalla grande) */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 rounded hover:bg-gray-700 ${
                location.pathname === link.to ? "bg-blue-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Menú colapsable (pantalla pequeña) */}
      {menuAbierto && (
        <div className="md:hidden px-4 pb-4 text-sm bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuAbierto(false)}
                className={`px-3 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === link.to ? "bg-blue-600" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuAbierto(false);
                handleLogout();
              }}
              className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded mt-2"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
