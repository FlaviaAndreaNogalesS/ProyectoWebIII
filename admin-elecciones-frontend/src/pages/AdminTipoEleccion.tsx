import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { TipoEleccion } from "../models/TipoEleccion";
import { TipoEleccionService } from "../services/TipoEleccionService";
import { Header } from "../components/Header";

export const AdminTipoEleccion = () => {
  const service = new TipoEleccionService();
  const [tipos, setTipos] = useState<TipoEleccion[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<TipoEleccion & { id?: string }>();

  const cargar = () => {
    service.listar().then(setTipos);
  };

  useEffect(() => {
    cargar();
  }, []);

  const onSubmit = (data: any) => {
    const payload = { nombre: data.nombre };

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

  const onEditar = (t: TipoEleccion) => {
    setModoEdicion(true);
    setValue("id", t.id);
    setValue("nombre", t.nombre);
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
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          {modoEdicion ? "Editar tipo de elección" : "Registrar nuevo tipo"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 border p-4 rounded bg-white shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del tipo</label>
            <input
              {...register("nombre", { required: true })}
              className="border p-2 w-full rounded"
              placeholder="Ej. Nacional, Municipal"
            />
          </div>

          <div className="flex gap-2">
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

        <h2 className="text-xl font-bold mb-2 text-blue-700">Tipos registrados</h2>
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((t) => (
              <tr key={t.id}>
                <td className="p-2 border">{t.nombre}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => onEditar(t)} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => onEliminar(t.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
