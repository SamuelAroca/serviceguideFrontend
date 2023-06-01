import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";

const Login = () => {
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
