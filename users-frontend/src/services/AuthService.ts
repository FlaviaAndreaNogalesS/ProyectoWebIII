import axios from "axios";
import type { LoginResponse } from "../models/dto/LoginResponse";
import type { RefreshTokenResponse } from "../models/dto/RefreshTokenResponse";
import type { UserInfoResponse } from "../models/dto/UserInfoResponse";
import apiClient from "./interceptors";
import type { RegisterResponse } from "../models/dto/RegisterResponse";

export class AuthService {

    login(username: string, password: string): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            axios.post("http://localhost:8000/api/users/token/", {
              username,
              password
            }).then((response) => {
              resolve(response.data)
            })
        });
}
    refreshToken(): Promise<RefreshTokenResponse> {
        return new Promise<RefreshTokenResponse>((resolve, reject) => {
            axios.post("http://localhost:8000/api/token/refresh/", {}, {
                withCredentials: true
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(new Error("Error al refrescar el token: " + error.message))
            })
        });
    }

    register(email: string, password: string): Promise<RegisterResponse> {
        return new Promise<RegisterResponse>((resolve, reject) => {
            axios.post("http://localhost:8000/api/users/register/", {

                email,
                password
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(new Error("Error al registrar el usuario: " + error.message))
            })
        });
    }

    me(): Promise<UserInfoResponse> {
    return new Promise<UserInfoResponse>((resolve, reject) => {
      apiClient.get("users/me/") // Ruta protegida en Django
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const status = error?.response?.status || "desconocido";
          reject(new Error("Error al obtener la información del usuario: " + status));
        });
    });
  }

   logout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            apiClient.post("http://localhost:8000/auth/logout/").then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(new Error("Error al cerrar sesión: " + error.message))
            })
        });
    }

}