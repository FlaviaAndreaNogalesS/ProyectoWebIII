export type Coordenada = {
  lat: number;
  lng: number;
};

export type Seccion = {
  id: string;
  nombre: string;
  limites: Coordenada[];
};
