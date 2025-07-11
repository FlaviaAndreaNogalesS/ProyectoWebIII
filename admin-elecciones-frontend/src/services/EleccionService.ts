
import apiClient from "./interceptors";
import type { Eleccion } from "../models/Eleccion";

export class EleccionService {
  listar(): Promise<Eleccion[]> {
    return apiClient.get("/elecciones/").then((res) => res.data);
  }

  crear(data: Omit<Eleccion, "id">): Promise<Eleccion> {
    return apiClient.post("/elecciones/", data).then((res) => res.data);
  }

  actualizar(id: string, data: Partial<Eleccion>): Promise<Eleccion> {
    return apiClient.put(`/elecciones/${id}/`, data).then((res) => res.data);
  }

  eliminar(id: string): Promise<void> {
    return apiClient.delete(`/elecciones/${id}/`).then((res) => res.data);
  }
}
