
import type { VotoMesa } from "../models/VotoMesa";

export class MonitorService {
  private datos: VotoMesa[] = [
    { recinto: "Universidad Nur", mesa: 1, total_votantes: 50, votos_emitidos: 34 },
    { recinto: "Universidad Nur", mesa: 2, total_votantes: 45, votos_emitidos: 21 },
    { recinto: "Escuela Central", mesa: 1, total_votantes: 40, votos_emitidos: 39 },
  ];

  async obtenerDatos(): Promise<VotoMesa[]> {
    return this.datos;
  }
}
