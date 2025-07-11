import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UsuarioService } from "../services/UsuarioService";
import type { Usuario } from "../models/Usuario";

type Inputs = {
  id?: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  role: "superadmin" | "admin_padron" | "admin_elecciones" | "jurado";
};

export const AdminUsuarios = () => {
  const service = new UsuarioService();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

  const cargar = () => {
    service.listar().then(setUsuarios);
  };

  const onSubmit = (data: Inputs) => {
    if (modoEdicion && data.id) {
      const datosFinales: Partial<Usuario> = {
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
      };

      service.actualizar(data.id, datosFinales)
        .then(() => {
          cargar();
          reset();
          setModoEdicion(false);
        })
        .catch((error) => {
          console.error("ERROR AL ACTUALIZAR USUARIO:", error.response?.data);
          alert("Ocurrió un error al actualizar el usuario. Revisa consola.");
        });
    } else {
      const datosFinales = {
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        password: data.password || "1234",
      };

      service.crear(datosFinales).then(() => {
        cargar();
        reset();
      });
    }
  };

  const onEditar = (usuario: Usuario) => {
    setModoEdicion(true);
    setValue("id", usuario.id);
    setValue("username", usuario.username);
    setValue("email", usuario.email);
    setValue("first_name", usuario.first_name);
    setValue("last_name", usuario.last_name);
    setValue("role", usuario.role);
  };

  const onCancelar = () => {
    reset();
    setModoEdicion(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {modoEdicion ? "Editar usuario" : "Crear nuevo usuario"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-2 border p-4 rounded">
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="Usuario" {...register("username", { required: true })} className="border p-2" />
          <input placeholder="Email" {...register("email", { required: true })} className="border p-2" />
          <input placeholder="Nombre" {...register("first_name", { required: true })} className="border p-2" />
          <input placeholder="Apellido" {...register("last_name", { required: true })} className="border p-2" />
          {!modoEdicion && (
            <input type="password" placeholder="Contraseña" {...register("password", { required: true })} className="border p-2" />
          )}
          <select {...register("role", { required: true })} className="border p-2">
            <option value="">Seleccione un rol</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin_padron">Administrador del Padrón</option>
            <option value="admin_elecciones">Administrador de Elecciones</option>
            <option value="jurado">Jurado</option>
          </select>
        </div>

        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {modoEdicion ? "Guardar cambios" : "Crear Usuario"}
          </button>
          {modoEdicion && (
            <button type="button" onClick={onCancelar} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Usuarios registrados</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Usuario</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Nombre completo</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Rol</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{u.username}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{u.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {u.first_name} {u.last_name}
                </td>
                <td className="px-4 py-2 text-sm capitalize text-gray-800">{u.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => onEditar(u)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded">Editar</button>
                  <button onClick={() => service.eliminar(u.id).then(cargar)} className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
