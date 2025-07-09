export type Coordenada = {
  lat: number;
  lng: number;
};

export interface Recinto {
  id: string;
  nombre: string;
  direccion?: string;
  coordenadas: Coordenada;
  cantidadMesas: number;
}
