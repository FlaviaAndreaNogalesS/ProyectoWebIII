export interface Jurado {
  id: string;
  nombre: string;
}

export interface Mesa {
  id: string;
  numero: number;
  recinto: string;
  jurados: Jurado[];
}
