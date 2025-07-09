import type { Seccion} from "../models/Seccion";

export class SeccionService {
  private storageKey = "secciones_mapa";

  private getStorage(): Seccion[] {
  const data = localStorage.getItem(this.storageKey);
  if (!data) return [];

  try {
    const parsed = JSON.parse(data);
    // Validar estructura mínima
    return Array.isArray(parsed)
      ? parsed.map((s) => ({
          ...s,
          limites: Array.isArray(s.limites) ? s.limites : [],
        }))
      : [];
  } catch {
    return [];
  }
}

  private saveStorage(data: Seccion[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  listar(): Promise<Seccion[]> {
    return Promise.resolve(this.getStorage());
  }

  crear(seccion: Seccion): Promise<void> {
    const actual = this.getStorage();
    this.saveStorage([...actual, seccion]);
    return Promise.resolve();
  }

  actualizar(id: string, data: Partial<Seccion>): Promise<void> {
    const actual = this.getStorage().map((s) =>
      s.id === id ? { ...s, ...data } : s
    );
    this.saveStorage(actual);
    return Promise.resolve();
  }

  eliminar(id: string): Promise<void> {
    const actual = this.getStorage().filter((s) => s.id !== id);
    this.saveStorage(actual);
    return Promise.resolve();
  }
}
