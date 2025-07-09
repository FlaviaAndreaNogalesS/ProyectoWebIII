import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { VotoPublicoService } from "../services/VotoPublicoService";
import type { VotoResumen } from "../models/VotoResumen";
import { Header } from "../components/Header";

Chart.register(ArcElement, Tooltip, Legend);

export const VerVotosPublico = () => {
  const [resumen, setResumen] = useState<VotoResumen[]>([]);

  const cargar = async () => {
    const service = new VotoPublicoService();
    const data = await service.obtenerResumen();
    setResumen(data);
  };

  useEffect(() => {
    cargar();
    const intervalo = setInterval(cargar, 2000); // simula tiempo real
    return () => clearInterval(intervalo);
  }, []);

  const chartData = {
    labels: resumen.map((r) => r.candidato),
    datasets: [
      {
        label: "Votos",
        data: resumen.map((r) => r.total),
        backgroundColor: resumen.map((r) => r.color),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
    <Header />
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resultados en Tiempo Real</h1>
      <div className="bg-white shadow p-4 rounded">
        {resumen.length > 0 ? (
          <Doughnut data={chartData} />
        ) : (
          <p className="text-gray-600">Aún no hay votos registrados.</p>
        )}
      </div>
    </div>
    </>
  );
};
