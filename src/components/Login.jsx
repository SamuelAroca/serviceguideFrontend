import React from "react";
import Swal from "sweetalert2";
import "../styled-sheets/Login.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";

window.onload = f => {
  var eye = document.getElementById('Eye');
  var input = document.getElementById('Input');

  f.preventDefault();
  eye.onclick = e => {
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
  return (
    <div className="main">
      <div className="components">
        <div className="container-login">
          <form className="container-form">
            <h2 className="container-logo">
              <RiWaterFlashFill className="logo" />
              ServiceGuide
            </h2>
            <h2 className="title-sign">Sign in</h2>
            <div className="container-label">
              <label className="label-title">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Type your email"
              />
              <label className="label-title">Password</label>
              <div className="password-container">
                <input
                  className="input-password form-control"
                  type="password"
                  placeholder="Type your password"
                  id="Input"
                />
                <RiEyeLine className="icon-password" id="Eye" />
              </div>
              <a href="forgot-password" className="forgot-password">
                Forgot password?
              </a>
              <button className="btn-login">
                LOGIN
                <RiArrowRightSLine className="icon" />
              </button>
            </div>
          </form>
        </div>
        <div className="container-image">
          <CarouselDemo />
        </div>
      </div>
    </div>
  );
};

export default Login;
