import { useEffect, useState } from "react";
import { PapeletaService } from "../services/PapeletaService";
import { Header } from "../components/Header";
import type { Candidatura } from "../models/Candidatura";

export const Papeleta = () => {
  const service = new PapeletaService();
  const [secciones, setSecciones] = useState<string[]>([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("");
  const [candidatos, setCandidatos] = useState<Candidatura[]>([]);

  useEffect(() => {
    service.obtenerSecciones().then(setSecciones);
  }, []);

  const generar = () => {
    if (seccionSeleccionada) {
      service.obtenerCandidatosPorSeccion(seccionSeleccionada).then(setCandidatos);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Generación de Papeleta Electoral</h1>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Seleccione una sección:</label>
          <select
            value={seccionSeleccionada}
            onChange={(e) => setSeccionSeleccionada(e.target.value)}
            className="border p-2 rounded w-full max-w-sm"
          >
            <option value="">-- Seleccione --</option>
            {secciones.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={generar}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          Generar Papeleta
        </button>

        {candidatos.length > 0 && (
          <div className="bg-white shadow p-6 rounded border">
            <h2 className="text-xl font-bold mb-6">
              Papeleta Sección: {seccionSeleccionada}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {candidatos.map((c) => (
                <div
                  key={c.id}
                  className="rounded overflow-hidden border shadow-lg text-white"
                  style={{
                    backgroundColor: c.color || "#999",
                    minHeight: "320px",
                    position: "relative",
                  }}
                >
                  <div className="p-3 text-center">
                    <div className="text-lg font-bold">{c.partido}</div>
                    <div className="text-sm italic mb-2">{c.sigla}</div>
                    <img
                      src={c.foto || "https://via.placeholder.com/100x120?text=Foto"}
                      alt={c.candidato}
                      className="mx-auto my-2 rounded shadow-md w-24 h-28 object-cover bg-white"
                    />
                    <div className="text-md font-semibold">{c.candidato}</div>
                  </div>

                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white w-6 h-6 border border-gray-400 rounded-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
