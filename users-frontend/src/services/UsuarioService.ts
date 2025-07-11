import apiClient from "./interceptors";
import type { Usuario } from "../models/Usuario";

export class UsuarioService {
  listar(): Promise<Usuario[]> {
    return apiClient.get("users/").then(res => res.data);
  }

  crear(usuario: Omit<Usuario, "id"> & { password: string }): Promise<Usuario> {
    return apiClient.post("users/", usuario).then(res => res.data);
  }

  actualizar(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    return apiClient.put(`users/${id}/`, usuario).then(res => res.data);
  }

  eliminar(id: string): Promise<void> {
    return apiClient.delete(`users/${id}/`).then(res => res.data);
  }
}
