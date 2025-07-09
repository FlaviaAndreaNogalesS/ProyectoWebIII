import { useEffect, useState } from "react";
import { AsignacionJuradoService } from "../services/AsignacionJuradoService";
import type { Jurado, Mesa } from "../models/AsignacionJurado";
import { Header } from "../components/Header";

export const AsignarJurados = () => {
  const service = new AsignacionJuradoService();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [jurados, setJurados] = useState<Jurado[]>([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<string>("");
  const [juradoSeleccionado, setJuradoSeleccionado] = useState<string>("");

  const cargarDatos = async () => {
    const [mesasRes, juradosRes] = await Promise.all([
      service.listarMesas(),
      service.listarJurados(),
    ]);
    setMesas(mesasRes);
    setJurados(juradosRes);
  };

  const asignar = async () => {
    const jurado = jurados.find(j => j.id === juradoSeleccionado);
    if (!mesaSeleccionada || !jurado) return;

    await service.asignarJurado(mesaSeleccionada, jurado);
    await cargarDatos(); // actualizar vista
    setJuradoSeleccionado("");
    setMesaSeleccionada("");
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Asignar jurados electorales a mesas</h1>

        <div className="border rounded bg-white p-4 shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Seleccione mesa</label>
              <select
                value={mesaSeleccionada}
                onChange={(e) => setMesaSeleccionada(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">-- Mesa --</option>
                {mesas.map((m) => (
                  <option key={m.id} value={m.id}>
                    Mesa {m.numero} - {m.recinto}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Seleccione jurado</label>
              <select
                value={juradoSeleccionado}
                onChange={(e) => setJuradoSeleccionado(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">-- Jurado --</option>
                {jurados.map((j) => (
                  <option key={j.id} value={j.id}>{j.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={asignar}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Asignar jurado
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2">Mesas y jurados asignados</h2>
        <table className="w-full text-sm border bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Recinto</th>
              <th className="p-2 border">Mesa</th>
              <th className="p-2 border">Jurados asignados</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((m) => (
              <tr key={m.id}>
                <td className="p-2 border">{m.recinto}</td>
                <td className="p-2 border">{m.numero}</td>
                <td className="p-2 border">
                  {m.jurados.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {m.jurados.map((j) => (
                        <li key={j.id}>{j.nombre}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500 italic">Sin jurados asignados</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
