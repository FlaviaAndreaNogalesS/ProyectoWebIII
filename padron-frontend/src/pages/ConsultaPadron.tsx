import { useState } from "react";
import { AdminMenu } from "../components/AdminMenu";

type Votante = {
  ci: string;
  nombre: string;
  direccion: string;
  recinto: string;
  id: string;
};

const votantesSimulados: Votante[] = [
  {
    ci: "1234567",
    nombre: "Juan Pérez",
    direccion: "Av. Libertad #123",
    recinto: "Escuela Central",
    id: "b2f9-3243-98ff",
  },
  {
    ci: "9876543",
    nombre: "Ana Rodríguez",
    direccion: "Calle Bolívar #45",
    recinto: "Coliseo Municipal",
    id: "a8b3-2048-22fe",
  },
];

export const ConsultaPadron = () => {
  const [ci, setCi] = useState("");
  const [resultado, setResultado] = useState<Votante | null>(null);
  const [error, setError] = useState("");

  const buscar = () => {
    const encontrado = votantesSimulados.find((v) => v.ci === ci.trim());
    if (encontrado) {
      setResultado(encontrado);
      setError("");
    } else {
      setResultado(null);
      setError("CI no encontrado en el padrón.");
    }
  };

  return (
    <>
      <AdminMenu />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
        <div className="max-w-lg w-full bg-white shadow rounded p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Consulta del Padrón Electoral
          </h1>

          <div className="mb-4">
            <label htmlFor="ci" className="block text-sm font-medium mb-1">
              Ingrese su número de CI
            </label>
            <div className="flex gap-2">
              <input
                id="ci"
                type="text"
                placeholder="Ej: 1234567"
                value={ci}
                onChange={(e) => setCi(e.target.value)}
                className="border p-2 flex-1 rounded"
              />
              <button
                onClick={buscar}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Consultar
              </button>
            </div>
          </div>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          {resultado && (
            <div className="border p-4 rounded bg-gray-100 mt-4 space-y-2">
              <p><strong>Nombre:</strong> {resultado.nombre}</p>
              <p><strong>CI:</strong> {resultado.ci}</p>
              <p><strong>Recinto de votación:</strong> {resultado.recinto}</p>
              <p><strong>ID Único:</strong> {resultado.id}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
