import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { SeccionService } from "../services/SeccionService";
import type { Seccion } from "../models/Seccion";
import { Header } from "../components/Header";
import { MapaGoogle } from "../components/MapaGoogle";

export const AdminSecciones = () => {
  const service = new SeccionService();
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors }} = useForm<Omit<Seccion, "id"> & { id?: string }>();

  const cargar = () => {
    service.listar().then(setSecciones);
  };

  const onSubmit = (data: any) => {
    const seccion: Seccion = {
      id: data.id || uuidv4(),
      nombre: data.nombre,
      limites: data.limites,
    };

    if (modoEdicion && data.id) {
      service.actualizar(data.id, seccion).then(() => {
        cargar();
        reset();
        setModoEdicion(false);
      });
    } else {
      service.crear(seccion).then(() => {
        cargar();
        reset();
      });
    }
  };

  const onEditar = (s: Seccion) => {
    setModoEdicion(true);
    setValue("id", s.id);
    setValue("nombre", s.nombre);
    setValue("limites", s.limites);
  };

  const onEliminar = (id: string) => {
  const confirmar = window.confirm("¿Estás seguro que quieres eliminar esta sección?");
  if (!confirmar) return;

  if (modoEdicion && watch("id") === id) {
  reset({
    id: "",
    nombre: "",
    limites: undefined, // 🔥 esto es clave para que desaparezca del mapa
  });
  setModoEdicion(false);
}
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
        <h1 className="text-xl font-bold mb-4">
          {modoEdicion ? "Editar sección" : "Registrar nueva sección"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 border p-4 rounded bg-white shadow">
          <div className="grid grid-cols-1 gap-4">
            <div>
  <label className="block text-sm font-medium mb-1">Nombre de la sección</label>
  <input
    {...register("nombre", {
      required: "Este campo es obligatorio",
      validate: (value) =>
        isNaN(Number(value)) || "El nombre no puede ser solo un número",
    })}
    className="border p-2 w-full"
    placeholder="Ej. Distrito Norte"
  />
  {errors.nombre && (
    <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
  )}
</div>
            <div>
              <label className="block text-sm font-medium mb-1">Dibuja los límites en el mapa</label>
              <MapaGoogle
                onPolygonComplete={(coords) => {
                  setValue("limites", coords);
                }}
                initialPolygon={watch("limites")} // ✅ le pasamos las coordenadas si estamos editando
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Límites seleccionados</label>
              <div className="text-xs bg-gray-100 p-2 rounded border">
                {watch("limites")?.map((c: any, i: number) => (
                  <div key={i}>({c.lat}, {c.lng})</div>
                ))}
              </div>
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

        <h2 className="text-xl font-bold mb-2">Secciones registradas</h2>
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Límites</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {secciones.map((s) => (
              <tr key={s.id}>
                <td className="p-2 border">{s.nombre}</td>
                <td className="p-2 border text-xs">
                  {Array.isArray(s.limites)
                    ? s.limites.map((c) => `(${c.lat}, ${c.lng})`).join("; ")
                    : "Sin límites definidos"}
                </td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => onEditar(s)} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => onEliminar(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
