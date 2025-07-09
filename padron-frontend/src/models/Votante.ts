export interface Votante {
  id: string; // UUID
  ci: string;
  nombre_completo: string;
  direccion: string;
  foto_anverso: string;  // base64 o URL simulada
  foto_reverso: string;
  foto_votante: string;
  recinto: string;
}
