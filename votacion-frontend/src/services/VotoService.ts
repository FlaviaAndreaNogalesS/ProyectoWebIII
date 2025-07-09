// services/VotoService.ts
export class VotoService {
  emitirVoto(ci: string, candidatoId: string): void {
    const votos = JSON.parse(localStorage.getItem("votos") || "[]");
    votos.push({ ci, candidatoId });
    localStorage.setItem("votos", JSON.stringify(votos));
    localStorage.removeItem("ci_habilitado"); // cerrar papeleta
  }

  obtenerVotos(): { ci: string; candidatoId: string }[] {
    return JSON.parse(localStorage.getItem("votos") || "[]");
  }
}
