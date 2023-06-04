import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const AuthGuard = () => {
  const authToken = Cookies.get("token"); // obtiene el valor de la cookie "authToken"
  const { pathname } = useLocation();

  return authToken ? <Outlet /> : <Navigate replace to="/login/signIn" />;
};

export default AuthGuard;
