import type { TipoEleccion } from "../models/TipoEleccion";
import apiClient from "./interceptors";

export class TipoEleccionService {
  listar(): Promise<TipoEleccion[]> {
    return apiClient.get("/tipos-eleccion/").then((res) => res.data);
  }

  crear(data: Omit<TipoEleccion, "id">): Promise<TipoEleccion> {
    return apiClient.post("/tipos-eleccion/", data).then((res) => res.data);
  }

  actualizar(id: string, data: Partial<TipoEleccion>): Promise<TipoEleccion> {
    return apiClient.put(`/tipos-eleccion/${id}/`, data).then((res) => res.data);
  }

  eliminar(id: string): Promise<void> {
    return apiClient.delete(`/tipos-eleccion/${id}/`).then((res) => res.data);
  }
}
