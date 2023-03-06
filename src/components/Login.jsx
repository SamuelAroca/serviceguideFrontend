import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "../styled-sheets/Login.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";
import { redirect } from "react-router-dom";
import Prueba from "./Prueba";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  const handleShow = () => {
    setShowPassword(!showPassword)
  }

  const [usuario, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.main}>
      <div className={styles.components}>
        <div className={styles.container_login}>
          <form className={styles.container_form}>
            <h2 className={styles.container_logo}>
              <RiWaterFlashFill className={styles.logo} />
              ServiceGuide
            </h2>
            <h2 className={styles.title_sign}>Sign in</h2>
            <div className={styles.container_label}>
              <label className={styles.label_title}>Email</label>
              <input
                className="form-control"
                type="text"
                placeholder="Type your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={styles.label_title}>Password</label>
              <div className={styles.password_container}>
                <input
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Type your password"
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <RiEyeLine className={styles.icon_password} onClick={handleShow} />
              </div>
              <div className={styles.links}>
                <a href="forgot-password">Forgot password?</a>
                <a href="/register">Create new account</a>
              </div>
              <button className={styles.btn_login}>
                LOGIN
                <RiArrowRightSLine className={styles.icon} />
              </button>
            </div>
          </form>
        </div>
        <div className={styles.container_image}>
          <CarouselDemo />
        </div>
      </div>
    </div>
  );
};

export default Login;
