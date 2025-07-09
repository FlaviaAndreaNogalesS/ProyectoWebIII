import { useState } from "react";
import { VotanteService } from "../services/VotanteService";
import type { Votante } from "../models/Votante";
import { Header } from "../components/Header";

export const ValidarVotante = () => {
  const service = new VotanteService();
  const [ci, setCi] = useState("");
  const [votante, setVotante] = useState<Votante | null>(null);
  const [error, setError] = useState("");

  const buscar = async () => {
    const resultado = await service.buscarPorCI(ci.trim());
    if (resultado) {
      setVotante(resultado);
      setError("");
    } else {
      setVotante(null);
      setError("No se encontró al votante.");
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Validación de Identidad del Elector</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Buscar por CI:</label>
          <input
            value={ci}
            onChange={(e) => setCi(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Ej: 12345678"
          />
          <button onClick={buscar} className="bg-blue-600 text-white px-4 py-2 rounded">
            Buscar
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {votante && (
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Datos del Votante</h2>
            <p><strong>Nombre:</strong> {votante.nombre_completo}</p>
            <p><strong>CI:</strong> {votante.ci}</p>
            <p><strong>Dirección:</strong> {votante.direccion}</p>
            <p><strong>Recinto:</strong> {votante.recinto}</p>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium">Foto anverso</p>
                <img src={votante.foto_anverso} alt="Anverso" className="w-full h-auto border rounded" />
              </div>
              <div>
                <p className="text-sm font-medium">Foto reverso</p>
                <img src={votante.foto_reverso} alt="Reverso" className="w-full h-auto border rounded" />
              </div>
              <div>
                <p className="text-sm font-medium">Foto votante</p>
                <img src={votante.foto_votante} alt="Votante" className="w-full h-auto border rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
