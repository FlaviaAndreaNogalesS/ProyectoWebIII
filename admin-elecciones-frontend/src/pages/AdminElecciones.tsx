import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Eleccion } from "../models/Eleccion";
import { EleccionService } from "../services/EleccionService";
import { Header } from "../components/Header";
import { TipoEleccionService } from "../services/TipoEleccionService";
import { type TipoEleccion } from "../models/TipoEleccion";
import { SeccionService } from "../services/SeccionService";
import { type Seccion } from "../models/Seccion";

export const AdminElecciones = () => {
  const service = new EleccionService();
  const [elecciones, setElecciones] = useState<Eleccion[]>([]);
  const [tipos, setTipos] = useState<TipoEleccion[]>([]);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<Omit<Eleccion, "id"> & { id?: string }>();

  const cargar = () => {
    service.listar().then(setElecciones);
  };

  useEffect(() => {
    cargar();
    new TipoEleccionService().listar().then(setTipos);
    new SeccionService().listar().then(setSecciones);
  }, []);

  const onSubmit = (data: any) => {
    const payload = {
      tipo: data.tipo,
      fecha: data.fecha,
      secciones: Array.isArray(data.secciones) ? data.secciones : [data.secciones],
    };

    if (modoEdicion && data.id) {
      service.actualizar(data.id, payload).then(() => {
        cargar();
        reset();
        setModoEdicion(false);
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
    setValue("secciones", e.secciones);
  };

  const onEliminar = (id: string) => {
    service.eliminar(id).then(cargar);
  };

  const onCancelar = () => {
    reset();
    setModoEdicion(false);
  };

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
              <select {...register("tipo", { required: true })} className="border p-2 w-full rounded">
                <option value="">Seleccione tipo</option>
                {tipos.map((t) => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
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
              <label className="block text-sm font-medium mb-1">Secciones</label>
              <select
                multiple
                {...register("secciones", { required: true })}
                className="border p-2 w-full rounded h-32"
              >
                {secciones.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
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
              <th className="p-2 border">Secciones</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {elecciones.map((e) => (
              <tr key={e.id}>
                <td className="p-2 border">{tipos.find(t => t.id === e.tipo)?.nombre || e.tipo}</td>
                <td className="p-2 border">{e.fecha}</td>
                <td className="p-2 border">
                  {e.secciones.map(secId => secciones.find(s => s.id === secId)?.nombre).join(", ")}
                </td>
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
