export interface Usuario {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: 'superadmin' | 'admin_padron' | 'admin_elecciones' | 'jurado';
}
