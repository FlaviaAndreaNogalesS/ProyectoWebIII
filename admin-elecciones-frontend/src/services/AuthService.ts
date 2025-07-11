import axios from "axios";
import type { LoginResponse } from "../models/dto/LoginResponse";
import type { RefreshTokenResponse } from "../models/dto/RefreshTokenResponse";
import apiClient from "./interceptors";
import type { RegisterResponse } from "../models/dto/RegisterResponse";

export class AuthService {

    login(username: string, password: string): Promise<LoginResponse> {
  return new Promise<LoginResponse>((resolve, reject) => {
    axios
      .post("http://localhost:8000/api/users/token/", {
        username,
        password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // Esto es lo que faltaba
        reject(new Error("Credenciales inválidas"));
      });
  });
}

refreshToken(): Promise<RefreshTokenResponse> {
  const refresh = localStorage.getItem("elec_refresh_token");

  return new Promise<RefreshTokenResponse>((resolve, reject) => {
    if (!refresh) {
      return reject(new Error("No hay refresh token"));
    }

    axios
      .post("http://localhost:8000/api/token/refresh/", { refresh })
      .then((response) => {
        const newAccess = response.data.access;
        localStorage.setItem("elec_access_token", newAccess);
        resolve({ access: newAccess });
      })
      .catch((error) => {
        reject(new Error("Error al refrescar el token: " + error.message));
      });
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

    me(): Promise<{ role: string }> {
  return axios.get("http://localhost:8000/api/users/me/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("elec_access_token")}`
    }
  }).then(res => res.data);
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