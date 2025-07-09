import type { Mesa } from "../models/Mesa";

export class MesaService {
  private storageKey = "mesas";

  private getStorage(): Mesa[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];
    try {
      return JSON.parse(data) as Mesa[];
    } catch {
      return [];
    }
  }

  private saveStorage(data: Mesa[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  listarPorRecinto(recintoId: string): Promise<Mesa[]> {
    return Promise.resolve(
      this.getStorage().filter((m) => m.recintoId === recintoId)
    );
  }

  crearMesas(recintoId: string, cantidad: number): Promise<void> {
    const actual = this.getStorage();
    const nuevas: Mesa[] = Array.from({ length: cantidad }).map((_, i) => ({
      id: `${recintoId}-mesa-${i + 1}`,
      numero: i + 1,
      recintoId,
    }));
    this.saveStorage([...actual, ...nuevas]);
    return Promise.resolve();
  }

  eliminarPorRecinto(recintoId: string): Promise<void> {
    const filtradas = this.getStorage().filter((m) => m.recintoId !== recintoId);
    this.saveStorage(filtradas);
    return Promise.resolve();
  }
}
