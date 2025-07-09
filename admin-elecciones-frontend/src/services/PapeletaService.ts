import type { Candidatura } from "../models/Candidatura";

export class PapeletaService {
  private secciones = ["Distrito 1", "Zona Sur", "Distrito 2"];
  private candidaturas: Candidatura[] = [
    {/*ejemplo nada es bakend*/
      id: "1",
      partido: "Partido Azul",
      sigla: "PA",
      color: "#1D4ED8",
      candidato: "María Fernández",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
      partido: "Movimiento Verde",
      sigla: "MV",
      color: "#10B981",
      candidato: "Carlos Ríos",
      foto: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: "3",
      partido: "Frente Unido",
      sigla: "FU",
      color: "#F59E0B",
      candidato: "Luis Ortega",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  async obtenerSecciones(): Promise<string[]> {
    return this.secciones;
  }

  async obtenerCandidatosPorSeccion(seccion: string): Promise<Candidatura[]> {
    // Simulación simple: todos los candidatos disponibles para todas las secciones
    return this.candidaturas;
  }
}
