import { useEffect, useState } from "react";
import { Header } from "../components/Header";

type Votante = {
  ci: string;
  nombre: string;
  recinto: string;
};

type Recinto = {
  nombre: string;
  cantidadMesas: number;
};

const votantesSimulados: Votante[] = [
  { ci: "123", nombre: "Carlos López", recinto: "Escuela Central" },
  { ci: "124", nombre: "Ana Martínez", recinto: "Escuela Central" },
  { ci: "125", nombre: "Pedro Álvarez", recinto: "Escuela Central" },
  { ci: "126", nombre: "Lucía Quispe", recinto: "Escuela Central" },
  { ci: "127", nombre: "Juan Pinto", recinto: "Escuela Central" },
  { ci: "128", nombre: "Maria Camacho", recinto: "Coliseo Municipal" },
  { ci: "129", nombre: "Luis Rivera", recinto: "Coliseo Municipal" },
];

const recintosSimulados: Recinto[] = [
  { nombre: "Escuela Central", cantidadMesas: 2 },
  { nombre: "Coliseo Municipal", cantidadMesas: 1 },
];

type Distribucion = {
  mesa: number;
  votantes: Votante[];
};

export const DistribucionMesas = () => {
  const [distribucion, setDistribucion] = useState<
    { recinto: string; mesas: Distribucion[] }[]
  >([]);

  useEffect(() => {
    const resultado: { recinto: string; mesas: Distribucion[] }[] = [];

    recintosSimulados.forEach((recinto) => {
      const votantesRecinto = votantesSimulados
        .filter((v) => v.recinto === recinto.nombre)
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Orden alfabético

      const mesas: Distribucion[] = Array.from({ length: recinto.cantidadMesas }, (_, i) => ({
        mesa: i + 1,
        votantes: [],
      }));

      votantesRecinto.forEach((votante, i) => {
        const mesaIndex = i % recinto.cantidadMesas;
        mesas[mesaIndex].votantes.push(votante);
      });

      resultado.push({ recinto: recinto.nombre, mesas });
    });

    setDistribucion(resultado);
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Distribución de Votantes entre Mesas</h1>

        {distribucion.map((r) => (
          <div key={r.recinto} className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">{r.recinto}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {r.mesas.map((m) => (
                <div key={m.mesa} className="border p-3 rounded bg-white shadow">
                  <h3 className="font-bold mb-2">Mesa {m.mesa}</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {m.votantes.map((v) => (
                      <li key={v.ci}>
                        {v.nombre} ({v.ci})
                      </li>
                    ))}
                    {m.votantes.length === 0 && (
                      <li className="text-gray-400 italic">Sin asignados</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
