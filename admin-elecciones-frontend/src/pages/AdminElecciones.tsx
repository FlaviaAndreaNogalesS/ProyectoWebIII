import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Eleccion } from "../models/Eleccion";
import { EleccionService } from "../services/EleccionService";
import { Header } from "../components/Header";

export const AdminElecciones = () => {
  const service = new EleccionService();
  const [elecciones, setElecciones] = useState<Eleccion[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<Omit<Eleccion, "id"> & { id?: string }>();

  const cargar = () => {
    service.listar().then(setElecciones);
  };

  const onSubmit = (data: any) => {
    const payload = {
      tipo: data.tipo,
      fecha: data.fecha,
      seccion: data.seccion,
    };

    if (modoEdicion && data.id) {
      service.actualizar(data.id, payload)
        .then(() => {
          cargar();
          reset();
          setModoEdicion(false);
        })
        .catch(() => {
          alert("No se pudo actualizar porque no hay backend.");
      });
    } else {
      service.crear(payload).then(() => {
        cargar();
        reset();
      });
    }
  };

  const onEditar = (e: Eleccion) => {
    setModoEdicion(true);
    setValue("id", e.id);
    setValue("tipo", e.tipo);
    setValue("fecha", e.fecha);
    setValue("seccion", e.seccion);
  };

  const onEliminar = (id: string) => {
    service.eliminar(id).then(cargar);
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
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          {modoEdicion ? "Editar elección" : "Registrar nueva elección"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 border p-4 rounded bg-white shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de elección</label>
              <input
                {...register("tipo", { required: true })}
                className="border p-2 w-full rounded"
                placeholder="Ej. Nacional, Municipal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                {...register("fecha", { required: true })}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Sección (área geográfica)</label>
              <input
                {...register("seccion", { required: true })}
                className="border p-2 w-full rounded"
                placeholder="Ej. Distrito 1, Zona Sur"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {modoEdicion ? "Guardar cambios" : "Registrar"}
            </button>
            {modoEdicion && (
              <button type="button" onClick={onCancelar} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-bold mb-2 text-blue-700">Elecciones registradas</h2>
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Sección</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {elecciones.map((e) => (
              <tr key={e.id}>
                <td className="p-2 border">{e.tipo}</td>
                <td className="p-2 border">{e.fecha}</td>
                <td className="p-2 border">{e.seccion}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => onEditar(e)} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => onEliminar(e.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
