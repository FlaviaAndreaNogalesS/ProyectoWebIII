import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { type LoginRequest } from "../models/dto/LoginRequest";
import { AuthService } from "../services/AuthService";
import { Container } from "../components/Container";
import { CabeceraLogin } from "../components/CabeceraLogin";

type Inputs = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(""); // Estado para mostrar error

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setErrorLogin(""); // limpiamos errores anteriores

    const login: LoginRequest = {
      username: data.username,
      password: data.password,
    };

    const auth = new AuthService();

    auth
      .login(login.username, login.password)
      .then((response) => {
        localStorage.setItem("auth_access_token", response.access);
        localStorage.setItem("auth_refresh_token", response.refresh);
        // Verificar rol
        auth.me().then((user) => {
          if (user.role === "superadmin") {
            navigate(URLS.USUARIOS_ADMIN);
          } else {
            setErrorLogin("⚠️ Solo los Super Administradores pueden acceder a esta sección.");
          }
        });
      })
      .catch(() => {
        setErrorLogin("⚠️ Usuario o contraseña incorrectos. Intenta nuevamente.");
      });
  };

  return (
    <>
    <CabeceraLogin />
      <Container>
        <Card title="Iniciar sesión" className="mx-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <label htmlFor="username">Usuario:</label>
              <Input type="text" id="username" {...register("username", { required: true })} />
              {errors.username && (
                <span className="text-red-500 text-sm">Este campo es requerido</span>
              )}
            </FormField>

            <FormField>
              <label htmlFor="password">Contraseña:</label>
              <Input type="password" id="password" {...register("password", { required: true })} />
              {errors.password && (
                <span className="text-red-500 text-sm">Este campo es requerido</span>
              )}
            </FormField>

            {errorLogin && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errorLogin}</p>
            )}

            <Button type="submit" title="Ingresar" />
          </form>
        </Card>
      </Container>
    </>
  );
};
