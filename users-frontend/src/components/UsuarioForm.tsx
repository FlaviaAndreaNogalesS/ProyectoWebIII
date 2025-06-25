import { useForm } from "react-hook-form";
import type { Usuario } from "../models/Usuario";

type Props = {
  onSubmit: (data: Partial<Usuario>) => void;
  defaultValues?: Partial<Usuario>;
};

export const UsuarioForm = ({ onSubmit, defaultValues }: Props) => {
  const { register, handleSubmit } = useForm<Partial<Usuario>>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("username")} placeholder="Usuario" className="border p-2 w-full" />
      <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
      <input {...register("first_name")} placeholder="Nombre" className="border p-2 w-full" />
      <input {...register("last_name")} placeholder="Apellido" className="border p-2 w-full" />
      <select {...register("rol")} className="border p-2 w-full">
        <option value="superadmin">Superadmin</option>
        <option value="padron">Administrador de Padrón</option>
        <option value="eleccion">Administrador de Elecciones</option>
        <option value="jurado">Jurado Electoral</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
};
