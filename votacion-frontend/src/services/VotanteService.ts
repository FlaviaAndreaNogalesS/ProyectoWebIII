import type { Votante } from "../models/Votante";

export class VotanteService {
  private votantes: Votante[] = [
    {/*ejemplo*/
      id: "1",
      ci: "12345678",
      nombre_completo: "Juan Pérez",
      direccion: "Av. Principal 123",
      foto_anverso: "https://via.placeholder.com/100x60?text=Anverso",
      foto_reverso: "https://via.placeholder.com/100x60?text=Reverso",
      foto_votante: "https://via.placeholder.com/100x100?text=Votante",
      recinto: "Universidad NUR",
    },
  ];

  async buscarPorCI(ci: string): Promise<Votante | null> {
    const encontrado = this.votantes.find(v => v.ci === ci);
    return encontrado || null;
  }
}
