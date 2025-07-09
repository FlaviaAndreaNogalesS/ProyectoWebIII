import type { Jurado, Mesa } from "../models/AsignacionJurado";

const jurados: Jurado[] = [
  { id: "j1", nombre: "Carlos Gómez" },
  { id: "j2", nombre: "Lucía Méndez" },
  { id: "j3", nombre: "Mario Fernández" },
];

const mesas: Mesa[] = [
  { id: "m1", numero: 1, recinto: "Universidad Nur", jurados: [] },
  { id: "m2", numero: 2, recinto: "Universidad Nur", jurados: [] },
  { id: "m3", numero: 1, recinto: "Coliseo Municipal", jurados: [] },
];

export class AsignacionJuradoService {
  listarMesas(): Promise<Mesa[]> {
    return Promise.resolve([...mesas]);
  }

  listarJurados(): Promise<Jurado[]> {
    return Promise.resolve([...jurados]);
  }

  asignarJurado(mesaId: string, jurado: Jurado): Promise<void> {
    const mesa = mesas.find((m) => m.id === mesaId);
    if (mesa && !mesa.jurados.some(j => j.id === jurado.id)) {
      mesa.jurados.push(jurado);
    }
    return Promise.resolve();
  }
}
