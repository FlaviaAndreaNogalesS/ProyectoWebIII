import apiClient from "./interceptors";
import type { Usuario } from "../models/Usuario";

export class UsuarioService {
  listar(): Promise<Usuario[]> {
    return apiClient.get("usuarios/").then(res => res.data);
  }

  crear(usuario: Omit<Usuario, "id"> & { password: string }): Promise<Usuario> {
    return apiClient.post("usuarios/", usuario).then(res => res.data);
  }

  actualizar(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    return apiClient.put(`usuarios/${id}/`, usuario).then(res => res.data);
  }

  eliminar(id: number): Promise<void> {
    return apiClient.delete(`usuarios/${id}/`).then(res => res.data);
  }
}
