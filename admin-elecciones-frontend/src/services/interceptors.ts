import axios from "axios";
import { AuthService } from "./AuthService";

const apiClient = axios.create({
  baseURL: "http://localhost:8001/api", // backend de admin_elecciones
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("elec_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await new AuthService().refreshToken();

        // ⚠️ ACTUALIZA MANUALMENTE el header con el nuevo token
        error.config.headers.Authorization = `Bearer ${newToken.access}`;

        // Reintenta la solicitud original
        return apiClient.request(error.config);
      } catch (authError) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(authError);
      }
    }

    console.error("Error en la respuesta de la API:", error.response);
    return Promise.reject(error);
  }
);

export default apiClient;
