export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  rol: 'superadmin' | 'padron' | 'eleccion' | 'jurado';
}
