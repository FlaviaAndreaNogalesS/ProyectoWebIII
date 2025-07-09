import type { Candidatura } from "../models/Candidatura";

export class CandidaturaService {
  private storageKey = "candidaturas_storage";

  private getStorage(): Candidatura[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveStorage(data: Candidatura[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async listar(): Promise<Candidatura[]> {
    return this.getStorage();
  }

  async crear(c: Omit<Candidatura, "id">): Promise<void> {
    const actual = this.getStorage();
    const nueva: Candidatura = { ...c, id: crypto.randomUUID() };
    this.saveStorage([...actual, nueva]);
  }

  async actualizar(id: string, c: Omit<Candidatura, "id">): Promise<void> {
    const actual = this.getStorage();
    const actualizado = actual.map((item) =>
      item.id === id ? { ...c, id } : item
    );
    this.saveStorage(actualizado);
  }

  async eliminar(id: string): Promise<void> {
    const actual = this.getStorage().filter((item) => item.id !== id);
    this.saveStorage(actual);
  }
}
