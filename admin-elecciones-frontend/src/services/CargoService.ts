import type { Cargo } from "../models/Cargo";
import { v4 as uuidv4 } from "uuid";

let cargosSimulados: Cargo[] = [];

export class CargoService {
  listar(): Promise<Cargo[]> {
    return Promise.resolve(cargosSimulados);
  }

  crear(cargo: Omit<Cargo, "id">): Promise<void> {
    const nuevo: Cargo = { ...cargo, id: uuidv4() };
    cargosSimulados.push(nuevo);
    return Promise.resolve();
  }

  actualizar(id: string, cargo: Omit<Cargo, "id">): Promise<void> {
    cargosSimulados = cargosSimulados.map(c => c.id === id ? { ...cargo, id } : c);
    return Promise.resolve();
  }

  eliminar(id: string): Promise<void> {
    cargosSimulados = cargosSimulados.filter(c => c.id !== id);
    return Promise.resolve();
  }
}
