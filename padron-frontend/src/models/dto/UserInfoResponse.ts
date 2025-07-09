export interface UserInfoResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    rol: 'superadmin' | 'padron' | 'eleccion' | 'jurado'; // ← agrega esto
}
