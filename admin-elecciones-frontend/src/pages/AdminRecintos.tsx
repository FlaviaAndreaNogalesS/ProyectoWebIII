import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { RecintoService } from "../services/RecintoService";
import { MesaService } from "../services/MesaService";
import { MapaMarcador } from "../components/MapaMarcador";
import type { Recinto } from "../models/Recinto";
import { Header } from "../components/Header";

export const AdminRecintos = () => {
  const recintoService = new RecintoService();
  const mesaService = new MesaService();
  

  const [recintos, setRecintos] = useState<Recinto[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<{
    id?: string;
    nombre: string;
    coordenadas?: { lat: number; lng: number };
    cantidadMesas: number;
  }>();

  const cargar = () => {
    recintoService.listar().then(setRecintos);
  };

  const onSubmit = async (data: any) => {
    const recinto: Recinto = {
      id: data.id || uuidv4(),
      nombre: data.nombre,
      coordenadas: data.coordenadas,
      cantidadMesas: parseInt(data.cantidadMesas),
    };

    if (modoEdicion && data.id) {
      await recintoService.actualizar(data.id, recinto);
    } else {
      await recintoService.crear(recinto);
      await mesaService.crearMesas(recinto.id, recinto.cantidadMesas);
    }

    cargar();
    reset();
    setModoEdicion(false);
  };

  const onEditar = (r: Recinto) => {
    setModoEdicion(true);
    setValue("id", r.id);
    setValue("nombre", r.nombre);
    setValue("coordenadas", r.coordenadas);
    setValue("cantidadMesas", r.cantidadMesas);
  };

  const onEliminar = async (id: string) => {
    const confirmar = confirm("¿Eliminar recinto y sus mesas?");
    if (!confirmar) return;
    await recintoService.eliminar(id);
    await mesaService.eliminarPorRecinto(id);
    cargar();
  };

  const onCancelar = () => {
    reset();
    setModoEdicion(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          {modoEdicion ? "Editar recinto" : "Registrar nuevo recinto"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 border p-4 rounded bg-white shadow">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del recinto</label>
              <input
                {...register("nombre", {
                  required: true,
                  validate: (value) => isNaN(Number(value)) || "El nombre no puede ser solo un número",
                })}
                className="border p-2 w-full"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
              )}

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ubicación en el mapa</label>
              <MapaMarcador
                initialPosition={watch("coordenadas")}
                onSelect={(lat, lng) => {
                  setValue("coordenadas", { lat, lng });
                }}
              />
            </div>

            {watch("coordenadas") && (
              <div className="text-sm bg-gray-100 p-2 border rounded">
                Coordenadas: ({watch("coordenadas")?.lat}, {watch("coordenadas")?.lng})
              </div>
            )}

            {!modoEdicion && (
              <div>
                <label className="block text-sm font-medium mb-1">Cantidad de mesas</label>
                <input
                  type="number"
                  {...register("cantidadMesas", { required: true, min: 1 })}
                  className="border p-2 w-full"
                  placeholder="Ej. 10"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {modoEdicion ? "Guardar cambios" : "Registrar"}
            </button>
            {modoEdicion && (
              <button type="button" onClick={onCancelar} className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-bold mb-2">Recintos registrados</h2>
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Coordenadas</th>
              <th className="p-2 border">Mesas</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recintos.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.nombre}</td>
                <td className="p-2 border">
                  ({r.coordenadas.lat}, {r.coordenadas.lng})
                </td>
                <td className="p-2 border">{r.cantidadMesas}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => onEditar(r)} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => onEliminar(r.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
