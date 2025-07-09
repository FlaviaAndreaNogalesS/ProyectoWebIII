import type { VotoResumen } from "../models/VotoResumen";

export class VotoPublicoService {
  async obtenerResumen(): Promise<VotoResumen[]> {
    const raw = localStorage.getItem("votos") || "[]";
    const votos: string[] = JSON.parse(raw);

    const resumenMap: Record<string, { total: number; color: string }> = {};

    for (const id of votos) {
      const data = localStorage.getItem(`candidato_${id}`);
      if (data) {
        const { candidato, color } = JSON.parse(data);
        if (!resumenMap[candidato]) resumenMap[candidato] = { total: 0, color };
        resumenMap[candidato].total += 1;
      }
    }

    return Object.entries(resumenMap).map(([candidato, { total, color }]) => ({
      candidato,
      total,
      color,
    }));
  }
}
