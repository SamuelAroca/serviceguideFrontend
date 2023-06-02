import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthGuard = () => {
  const authToken = Cookies.get("token"); // obtiene el valor de la cookie "authToken"

  return authToken ? <Outlet /> : <Navigate replace to="/login/signIn" />;
};

export default AuthGuard;
