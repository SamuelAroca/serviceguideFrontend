import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import CarouselDemo from "../../../components/CarouselDemo";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RiWaterFlashFill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { Alert } from "@mui/material";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_AUTH;

  const home = () => {
    navigate("/");
  };

  const onValidate = () => {
    let errors = {};
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar email

    if (!email.email.trim()) {
      errors.email = "No puede estar vacio";
    } else if (!regexEmail.test(email.email)) {
      errors.email = "You must have a valid email format";
    }

    if (!email.password.trim()) {
      errors.password = "No puede estar vacio";
    }
    return errors;
  };

  const login = async (e) => {
    e.preventDefault();
    const err = onValidate(email);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        let response = await axios.post(`${url}/login`, email);

        if (!response.status != 200) {
          document.cookie = `token=${response.data.token}; max-age=${
            3600 * 5
          }; path=/; samesite=strict`;
          navigate("/private/major/home/");
        }
      } catch (error) {
        let response = error;
        console.log(response.response.data.message);
        let message = response.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
          footer: '<a href="/forgot-password">Forgot password?</a>',
        });
      }

      setEmail({
        email: "",
        password: "",
      });
    } else {
      setErrors(err);
    }
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  }

  return (
    <div className={styles.components}>
      <div className={styles.div_home_button}>
        <button className={styles.home_button} onClick={home}>
          Atrás
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.container_login}>
          <form className={styles.container_form} onSubmit={login}>
            <div className={styles.container_logo}>
              <h2 className={styles.logo_title}>
                <RiWaterFlashFill className={styles.logo} />
                ServiceGuide
              </h2>
            </div>
            <h2 className={styles.title_sign}>Sign in</h2>
            <div className={styles.container_label}>
              <div className={styles.inputs_gap}>
                <div>
                  <TextField
                    label="Email"
                    variant="outlined"
                    placeholder="Type your email"
                    className={styles.inputsMaterial}
                    fullWidth
                    size="small"
                    name="email"
                    value={email.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <Alert severity="warning"> {errors.email} </Alert>
                  )}
                </div>
                <div className={styles.password_container}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password"
                    fullWidth
                    size="small"
                    className={styles.inputsMaterial}
                    name="password"
                    value={email.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <Alert severity="warning"> {errors.password} </Alert>
                  )}
                  <RiEyeLine
                    className={styles.icon_password}
                    onClick={handleShow}
                  />
                </div>
              </div>
              <div className={styles.links}>
                <Link to={"/login/forgot-password"}>Forgot password?</Link>
                <Link to={"/login/signUp"}>Create new account</Link>
              </div>
              <div className={styles.div_button_login}>
                <button className={styles.login_button} onClick={login}>
                  Sign in
                  <div className={styles.arrow_wrapper}>
                    <div className={styles.arrow}></div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.container_image}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
