import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "../styled-sheets/Login.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";

window.onload = f => {
  f.preventDefault();
  eye.onclick = e => {
    var eye = document.getElementById('Eye');
    var input = document.getElementById('Input');
    console.log(eye)
    e.preventDefault();
    if (input.value.length > 0) {
      if (input.type == 'password') {
        input.type = 'text'
        eye.style.opacity = 0.8
      } else {
        input.type = 'password'
        eye.style.opacity = 0.4
      }
    } else {
      console.log('Paila');
    }
  }
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
                type="email"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={styles.label_title}>Password</label>
              <div className={styles.password_container}>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Type your password"
                  id="Input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiEyeLine className={styles.icon_password} id="Eye" />
              </div>
              <div className={styles.links}>
                <a href="forgot-password">
                  Forgot password?
                </a>
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
