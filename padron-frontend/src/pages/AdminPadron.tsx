import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { AdminMenu } from "../components/AdminMenu";


type Votante = {
  id: string;
  ci: string;
  nombre: string;
  direccion: string;
  foto_anverso?: File;
  foto_reverso?: File;
  foto_votante?: File;
  recinto: string;
};

export const AdminPadron = () => {
  const [votantes, setVotantes] = useState<Votante[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<Omit<Votante, "id"> & { id?: string }>();

  const cargar = () => {
    // Simulación de carga, podría venir del backend
    setVotantes([...votantes]);
  };

  const onSubmit = (data: any) => {
    const newVotante: Votante = {
      id: modoEdicion && data.id ? data.id : uuidv4(),
      ci: data.ci,
      nombre: data.nombre,
      direccion: data.direccion,
      foto_anverso: data.foto_anverso?.[0],
      foto_reverso: data.foto_reverso?.[0],
      foto_votante: data.foto_votante?.[0],
      recinto: data.recinto,
    };

    if (modoEdicion && data.id) {
      setVotantes(prev => prev.map(v => (v.id === data.id ? newVotante : v)));
    } else {
      setVotantes(prev => [...prev, newVotante]);
    }

    reset();
    setModoEdicion(false);
  };

  const onEditar = (v: Votante) => {
    setModoEdicion(true);
    setValue("id", v.id);
    setValue("ci", v.ci);
    setValue("nombre", v.nombre);
    setValue("direccion", v.direccion);
    setValue("recinto", v.recinto);
  };

  const onEliminar = (id: string) => {
    setVotantes(prev => prev.filter(v => v.id !== id));
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
  <AdminMenu />
  <div className="min-h-screen bg-gray-50">
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {modoEdicion ? "Editar votante" : "Registrar votante"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">CI</label>
              <input {...register("ci", { required: true })} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre completo</label>
              <input {...register("nombre", { required: true })} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Dirección</label>
              <input {...register("direccion", { required: true })} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Recinto</label>
              <select {...register("recinto", { required: true })} className="w-full border rounded p-2">
                <option value="">Seleccione recinto</option>
                <option value="Escuela Central">Escuela Central</option>
                <option value="Coliseo Municipal">Coliseo Municipal</option>
                <option value="Unidad Educativa Bolivia">Unidad Educativa Bolivia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Foto carnet - anverso</label>
              <input type="file" {...register("foto_anverso")} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Foto carnet - reverso</label>
              <input type="file" {...register("foto_reverso")} className="w-full border rounded p-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Foto del votante</label>
              <input type="file" {...register("foto_votante")} className="w-full border rounded p-2" />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded">
              {modoEdicion ? "Guardar cambios" : "Registrar"}
            </button>
            {modoEdicion && (
              <button type="button" onClick={onCancelar} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Votantes registrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">CI</th>
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Dirección</th>
                <th className="px-4 py-2 border">Recinto</th>
                <th className="px-4 py-2 border">UUID</th>
                <th className="px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {votantes.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{v.ci}</td>
                  <td className="px-4 py-2 border">{v.nombre}</td>
                  <td className="px-4 py-2 border">{v.direccion}</td>
                  <td className="px-4 py-2 border">{v.recinto}</td>
                  <td className="px-4 py-2 border text-xs text-gray-500">{v.id}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <button onClick={() => onEditar(v)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                        Editar
                      </button>
                      <button onClick={() => onEliminar(v.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
  </>
);

};
