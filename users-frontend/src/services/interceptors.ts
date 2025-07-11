import axios from "axios";
import { AuthService } from "./AuthService";

const apiClient = axios.create({ //url backend
    baseURL: "http://localhost:8000/api/users",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
});

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


//interceptor de respuests
apiClient.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if (error.response && error.response.status === 401) {
        try {
            await new AuthService().refreshToken()
        } catch (authError) {
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            console.log("auth error", authError)
            return Promise.reject(authError)
        }
        return apiClient.request(error.config)
    }

    console.error("Error en la respuesta de la API: ", error.response);
    return Promise.reject(error);
});

export default apiClient;