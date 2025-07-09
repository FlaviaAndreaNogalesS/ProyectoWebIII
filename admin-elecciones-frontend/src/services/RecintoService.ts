import type { Recinto } from "../models/Recinto";

export class RecintoService {
  private storageKey = "recintos";

  private getStorage(): Recinto[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];
    try {
      return JSON.parse(data) as Recinto[];
    } catch {
      return [];
    }
  }

  private saveStorage(data: Recinto[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  listar(): Promise<Recinto[]> {
    return Promise.resolve(this.getStorage());
  }

  crear(recinto: Recinto): Promise<void> {
    const actual = this.getStorage();
    this.saveStorage([...actual, recinto]);
    return Promise.resolve();
  }

  actualizar(id: string, data: Partial<Recinto>): Promise<void> {
    const actual = this.getStorage().map((r) =>
      r.id === id ? { ...r, ...data } : r
    );
    this.saveStorage(actual);
    return Promise.resolve();
  }

  eliminar(id: string): Promise<void> {
    const actual = this.getStorage().filter((r) => r.id !== id);
    this.saveStorage(actual);
    return Promise.resolve();
  }
}
