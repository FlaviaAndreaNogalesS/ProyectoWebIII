import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Cargo } from "../models/Cargo";
import { CargoService } from "../services/CargoService";
import { Header } from "../components/Header";

const SECCIONES_SIMULADAS = ["Distrito 1", "Distrito 2", "Zona Sur", "Zona Norte"];

export const AdminCargos = () => {
  const service = new CargoService();
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Cargo, "id"> & { id?: string }>();

  const cargar = () => {
    service.listar().then(setCargos);
  };

  const onSubmit = (data: any) => {
    const payload = {
      nombre: data.nombre,
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

  const onEditar = (c: Cargo) => {
    setModoEdicion(true);
    setValue("id", c.id);
    setValue("nombre", c.nombre);
    setValue("secciones", c.secciones);
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
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">{modoEdicion ? "Editar cargo" : "Registrar nuevo cargo"}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 border p-4 rounded bg-white shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del cargo</label>
              <input {...register("nombre", { required: true })} className="border p-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Secciones afectadas</label>
              <select {...register("secciones")} className="border p-2 w-full" multiple>
                {SECCIONES_SIMULADAS.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
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

        <h2 className="text-xl font-bold mb-2">Cargos registrados</h2>
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Cargo</th>
              <th className="p-2 border">Secciones</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">{c.nombre}</td>
                <td className="p-2 border">{c.secciones.join(", ")}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => onEditar(c)} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => onEliminar(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
