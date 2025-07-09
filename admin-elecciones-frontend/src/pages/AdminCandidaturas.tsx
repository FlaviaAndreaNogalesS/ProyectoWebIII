import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Candidatura } from "../models/Candidatura";
import { CandidaturaService } from "../services/CandidaturaService";
import { Header } from "../components/Header";

export const AdminCandidaturas = () => {
  const service = new CandidaturaService();
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Candidatura, "id"> & { id?: string }>();

  const cargar = () => {
    service.listar().then(setCandidaturas);
  };

  const onSubmit = (data: any) => {
    const payload: Omit<Candidatura, "id"> = {
      partido: data.partido,
      sigla: data.sigla,
      color: data.color,
      candidato: data.candidato,
      foto: data.foto, // viene de watch o setValue
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

  const onEditar = (c: Candidatura) => {
    setModoEdicion(true);
    setValue("id", c.id);
    setValue("partido", c.partido);
    setValue("sigla", c.sigla);
    setValue("color", c.color);
    setValue("candidato", c.candidato);
    setValue("foto", c.foto || "");
  };

  const onEliminar = (id: string) => {
    service.eliminar(id).then(cargar);
  };

  const onCancelar = () => {
    reset();
    setModoEdicion(false);
  };

  // 🔥 convertir imagen a base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString();
      if (base64) setValue("foto", base64);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {modoEdicion ? "Editar candidatura" : "Registrar nueva candidatura"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 border p-4 rounded bg-white shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Partido</label>
              <input {...register("partido", { required: true })} className="border p-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sigla</label>
              <input {...register("sigla", { required: true })} className="border p-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input type="color" {...register("color", { required: true })} className="border w-16 h-10" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Candidato</label>
              <input {...register("candidato", { required: true })} className="border p-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Foto del candidato</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
              {watch("foto") && (
                <img src={watch("foto")} alt="preview" className="mt-2 h-24 object-contain rounded border" />
              )}
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

        <h2 className="text-xl font-bold mb-2">Candidaturas registradas</h2>
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Foto</th>
              <th className="p-2 border">Partido</th>
              <th className="p-2 border">Sigla</th>
              <th className="p-2 border">Color</th>
              <th className="p-2 border">Candidato</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {candidaturas.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">
                  {c.foto ? (
                    <img src={c.foto} alt={c.candidato} className="w-10 h-12 object-cover rounded shadow" />
                  ) : (
                    <span className="text-xs text-gray-400 italic">Sin foto</span>
                  )}
                </td>
                <td className="p-2 border">{c.partido}</td>
                <td className="p-2 border">{c.sigla}</td>
                <td className="p-2 border">
                  <span className="inline-block w-5 h-5 rounded-full" style={{ backgroundColor: c.color }}></span>
                </td>
                <td className="p-2 border">{c.candidato}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => onEditar(c)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Editar
                  </button>
                  <button onClick={() => onEliminar(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
