// pages/AdminMonitoreo.tsx
import { useEffect, useState } from "react";
import { MonitorService } from "../services/MonitorService";
import type { VotoMesa } from "../models/VotoMesa";
import { Header } from "../components/Header";

export const AdminMonitoreo = () => {
  const service = new MonitorService();
  const [datos, setDatos] = useState<VotoMesa[]>([]);

  useEffect(() => {
    service.obtenerDatos().then(setDatos);
  }, []);

  const agrupado = datos.reduce((acc, mesa) => {
    acc[mesa.recinto] = acc[mesa.recinto] || [];
    acc[mesa.recinto].push(mesa);
    return acc;
  }, {} as Record<string, VotoMesa[]>);

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Monitoreo de Votación por Recinto</h1>

        {Object.entries(agrupado).map(([recinto, mesas]) => (
          <div key={recinto} className="mb-6 bg-white border shadow p-4 rounded">
            <h2 className="text-lg font-bold mb-2">{recinto}</h2>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Mesa</th>
                  <th className="border p-2">Total Votantes</th>
                  <th className="border p-2">Votos Emitidos</th>
                  <th className="border p-2">Faltan</th>
                </tr>
              </thead>
              <tbody>
                {mesas.map((m) => (
                  <tr key={m.mesa}>
                    <td className="border p-2 text-center">{m.mesa}</td>
                    <td className="border p-2 text-center">{m.total_votantes}</td>
                    <td className="border p-2 text-center">{m.votos_emitidos}</td>
                    <td className="border p-2 text-center">{m.total_votantes - m.votos_emitidos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};
