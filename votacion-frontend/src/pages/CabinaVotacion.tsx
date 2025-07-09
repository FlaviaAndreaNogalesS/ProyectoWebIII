import { useEffect, useState } from "react";
import { PapeletaService } from "../services/PapeletaService";
import { VotoService } from "../services/VotoService";
import type { Candidatura } from "../models/Candidatura";
import { Header } from "../components/Header";

export const CabinaVotacion = () => {
  const [ciHabilitado, setCiHabilitado] = useState("");
  const [candidatos, setCandidatos] = useState<Candidatura[]>([]);
  const [seleccionado, setSeleccionado] = useState<string>("");

  useEffect(() => {
    const ci = localStorage.getItem("ci_habilitado");
    if (ci) {
      setCiHabilitado(ci);
      const papeleta = new PapeletaService();
      papeleta.obtenerCandidatosPorSeccion("Zona Sur").then(setCandidatos); // puedes cambiarlo por secciones reales
    }
  }, []);

  const votar = () => {
    if (!seleccionado) {
      alert("Debe seleccionar un candidato");
      return;
    }

    const service = new VotoService();
    service.emitirVoto(ciHabilitado, seleccionado);

    // Guardar voto en localStorage para resumen público
    const votos = JSON.parse(localStorage.getItem("votos") || "[]");
    votos.push(seleccionado);
    localStorage.setItem("votos", JSON.stringify(votos));

    const candidatoSeleccionado = candidatos.find(c => c.id === seleccionado);
    if (candidatoSeleccionado) {
      localStorage.setItem(`candidato_${seleccionado}`, JSON.stringify({
        candidato: candidatoSeleccionado.candidato,
        color: candidatoSeleccionado.color
      }));
    }

    // Limpiar papeleta y cerrar sesión
    alert("✅ Voto registrado exitosamente");
    localStorage.removeItem("ci_habilitado");
    setCiHabilitado("");
    setSeleccionado("");
  };

  if (!ciHabilitado) {
    return <p className="text-center text-gray-600 mt-10">Esperando habilitación del jurado...</p>;
  }

  return (
    <>
    <Header />
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Cabina de Votación</h1>
      <p className="mb-2">CI habilitado: <strong>{ciHabilitado}</strong></p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {candidatos.map((c) => (
          <div
            key={c.id}
            className={`cursor-pointer border p-3 rounded text-white ${seleccionado === c.id ? "ring-4 ring-yellow-400" : ""}`}
            style={{ backgroundColor: c.color }}
            onClick={() => setSeleccionado(c.id)}
          >
            <div className="text-center">
              <div className="font-bold">{c.partido}</div>
              <div className="italic text-sm">{c.sigla}</div>
              <img
                src={c.foto || "https://via.placeholder.com/100x120?text=Foto"}
                alt={c.candidato}
                className="w-24 h-28 object-cover mx-auto my-2 rounded bg-white"
              />
              <div className="font-semibold">{c.candidato}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={votar}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Confirmar voto
        </button>
      </div>
    </div>
    </>
  );
};
