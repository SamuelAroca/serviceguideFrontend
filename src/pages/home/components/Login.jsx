import React, { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import CarouselDemo from "../../../components/CarouselDemo";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.jpg";
import img2 from "../../../assets/alcantarillado.jpg";
import img3 from "../../../assets/Electricistas-scaled.jpg";
import img4 from "../../../assets/gas natural.jpeg";
import axios from "axios";

const Login = ({ open, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = "http://localhost:8080/api/users/auth/login";

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(url, {
          login: email,
          password: password,
        })
        .then((response) => {
          if (response.status != 200) {
            
            console.log(response.data.message)
          } else {
            console.log(response.data);
            console.log(response.data.firstName);
            sessionStorage.setItem("token", response.data.token);
            let user = [response.data.id, response.data.firstName, response.data.lastName, response.data.login, response.data.token]
            sessionStorage.setItem("user", user);
            navigate('/home')
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.components}>
      <AiOutlineClose
        onClick={() => setOpen(!open)}
        className={styles.close_button}
      />
      <div className={styles.container_login}>
        <form className={styles.container_form}>
          <h2 className={styles.container_logo}>
            <RiWaterFlashFill className={styles.logo} />
            ServiceGuide
          </h2>
          <h2 className={styles.title_sign}>Sign in</h2>
          <div className={styles.container_label}>
            <div className={styles.inputs_gap}>
              <div>
                <TextField
                  /* id="outlined-basic" */
                  label="Email"
                  variant="outlined"
                  placeholder="Type your email"
                  className={styles.inputsMaterial}
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.password_container}>
                <TextField
                  /* id="outlined-basic" */
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  fullWidth
                  className={styles.inputsMaterial}
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <RiEyeLine
                  className={styles.icon_password}
                  onClick={handleShow}
                />
              </div>
            </div>

            <div className={styles.links}>
              <a href="forgot-password">Forgot password?</a>
              <Link to="/register">Create new account</Link>
            </div>
            <button className={styles.btn_login} onClick={login}>
              LOGIN
              <RiArrowRightSLine className={styles.icon} />
            </button>
          </div>
        </form>
      </div>
      <div className={styles.container_image}>
        <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
      </div>
    </div>
  );
};

export default Login;
