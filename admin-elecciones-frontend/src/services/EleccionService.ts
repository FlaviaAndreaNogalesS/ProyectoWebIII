// services/EleccionService.ts
import type { Eleccion } from "../models/Eleccion";
import { v4 as uuidv4 } from 'uuid';

let eleccionesSimuladas: Eleccion[] = [];

export class EleccionService {
  listar(): Promise<Eleccion[]> {
    return Promise.resolve(eleccionesSimuladas);
  }

  crear(data: Omit<Eleccion, "id">): Promise<void> {
    eleccionesSimuladas.push({ ...data, id: uuidv4() });
    return Promise.resolve();
  }

  actualizar(id: string, data: Omit<Eleccion, "id">): Promise<void> {
    const index = eleccionesSimuladas.findIndex(e => e.id === id);
    if (index !== -1) {
      eleccionesSimuladas[index] = { ...data, id };
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("No encontrado"));
    }
  }

  eliminar(id: string): Promise<void> {
    eleccionesSimuladas = eleccionesSimuladas.filter(e => e.id !== id);
    return Promise.resolve();
  }
}
