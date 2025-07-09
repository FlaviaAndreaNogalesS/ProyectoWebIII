import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from '../components/Card';
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { type LoginRequest } from "../models/dto/LoginRequest";
import { AuthService } from "../services/AuthService";
import { Container } from "../components/Container";
//import { useAuth } from "../hooks/useAuth";
import { GuestMenu } from "../components/GuestMenu";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  //const { doLogin } = useAuth(); // Guarda los tokens y email

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const login: LoginRequest = {
      username: data.email, // si usas el email como username en backend
      password: data.password,
    };

    new AuthService()
  .login(login.username, login.password)
  .then((response) => {
    localStorage.setItem("access_token", response.access);
    localStorage.setItem("refresh_token", response.refresh);

    // Obtener info del usuario y redirigir por rol
    new AuthService().me().then((userInfo) => {
      const rol = userInfo.rol;

      if (rol === "superadmin") {
        navigate(URLS.USUARIOS_ADMIN);
      } else if (rol === "padron") {
        navigate(URLS.ADMIN_PADRON);
      } else {
        alert("Rol no autorizado para ingresar.");
      }
    });
  })
  .catch((error) => {
    alert("Credenciales inválidas");
    console.error("Login error:", error.message);
  });

  };

  return (
    <>
      <GuestMenu />
      <Container>
        <Card title="Iniciar sesión" className="mx-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <label htmlFor="email">Usuario:</label>
              <Input type="text" id="email" {...register("email", { required: true })} />
              {errors.email && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </FormField>
            <FormField>
              <label htmlFor="password">Contraseña:</label>
              <Input type="password" id="password" {...register("password", { required: true })} />
              {errors.password && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </FormField>
            <Button type="submit" title="Ingresar" />
          </form>
        </Card>
      </Container>
    </>
  );
};
