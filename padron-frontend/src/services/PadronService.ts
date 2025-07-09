import type { Votante } from "../models/Votante";

const FAKE_DB: Votante[] = [];

export class PadronService {
  listar(): Promise<Votante[]> {
    return Promise.resolve(FAKE_DB);
  }

  crear(v: Votante): Promise<void> {
    FAKE_DB.push(v);
    return Promise.resolve();
  }

  actualizar(id: string, datos: Partial<Votante>): Promise<void> {
    const i = FAKE_DB.findIndex((v) => v.id === id);
    if (i >= 0) FAKE_DB[i] = { ...FAKE_DB[i], ...datos };
    return Promise.resolve();
  }

  eliminar(id: string): Promise<void> {
    const i = FAKE_DB.findIndex((v) => v.id === id);
    if (i >= 0) FAKE_DB.splice(i, 1);
    return Promise.resolve();
  }

  buscarPorCI(ci: string): Promise<Votante | null> {
    const votante = FAKE_DB.find((v) => v.ci === ci);
    return Promise.resolve(votante || null);
  }
}
