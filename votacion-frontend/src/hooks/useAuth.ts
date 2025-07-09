import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { loginUser, logoutUser } from "../redux/slices/authSlice"
import { AuthService } from "../services/AuthService"

//define los datos
type LoginParams = {
    access_token: string,
    refresh_token: string,
    email: string,
}

//manejo de autenticación
export const useAuth = () => {
    const dispatch = useAppDispatch()
    //obtiene
    const email = useAppSelector((state) => state.auth.email)

    const doLogin = (params: LoginParams) => {
        dispatch(loginUser(params.email))
    }

    const doLogout = () => {
        new AuthService().logout().then(() => {
            dispatch(logoutUser())
        })
    }

    //verifica si
    useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    new AuthService().me().then((response) => {
        if (response.email) {
            dispatch(loginUser(response.email))
            if (response.is_staff) {
                alert("Login admin")
            } else {
                alert("Login exitoso")
            }
        }
    }).catch((err) => {
        console.error("No se pudo obtener el usuario logueado", err.message);
    });
}, [])


    return { email, doLogin, doLogout }
}
