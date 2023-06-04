import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const accesTocken = Cookies.get("token");

  useEffect(() => {
    if (accesTocken) {
      navigate("/private/major/home");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="signIn" replace />} // Redirige a "/signIn" por defecto
        />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default Login;
