import React, { useState, useContext } from "react";
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
import { getUserDataService } from "../../../services/get-user-data.service";
import { MyContext } from "../../../context/UserContext";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { SignInLayout } from "../styled-components/singin-layout.styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignIn = () => {
  // Logica para obtener los datos del usuario
  const { updateUserData } = useContext(MyContext);

  const getUserData = async () => {
    try {
      const data = await getUserDataService();
      updateUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const onValidate = () => {
    let errors = {};
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar email

    if (!email.email.trim()) {
      errors.email = "No puede estar vacio";
    } else if (!regexEmail.test(email.email)) {
      errors.email = "Debe tener un formato de correo electrónico válido";
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

        if (response.status === 200) {
          Cookies.set("token", response.data.token);
          getUserData();
          navigate("/private/major/home/");
        }
      } catch (error) {
        let response = error;
        console.log(error);
        let message = response.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
          footer: '<a href="/forgot-password">¿Has olvidado tu contraseña?</a>',
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

  const inputProps = {
    style: {
      borderRadius: "4px", // Cambia el valor según el border radius deseado
    },
  };

  return (
    <div className={styles.components}>
      <SignInLayout>
        <div className="form_container">
          <form onSubmit={login}>
            <h1>¡Bienvenido de nuevo!</h1>
            <p className="subtitle">
              Empieza a gestionar tus finanzas más rápido y mejor
            </p>
            <div>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                placeholder="Digíta tu correo"
                className="inputsMaterial"
                fullWidth
                size="small"
                name="email"
                value={email.email}
                onChange={handleInputChange}
                InputProps={inputProps}
                /* style={{ borderRadius: "2rem" }} */
              />
              {errors.email && (
                <Alert severity="warning"> {errors.email} </Alert>
              )}
            </div>

            <div className={styles.password_container}>
              <TextField
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="Digíta tu contraseña"
                fullWidth
                size="small"
                className="inputsMaterial"
                name="password"
                value={email.password}
                InputProps={inputProps}
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

            <Link className="forgot_password" to={"/login/forgot-password"}>
              ¿Olvidaste tu contraseña?
            </Link>

            <div>
              <button onClick={login}>
                Iniciar sesión
                <div className={styles.arrow_wrapper}>
                  <div className={styles.arrow}></div>
                </div>
              </button>
            </div>

            <span className="signup" to={"/login/signUp"}>
              <p>¿Aún no tienes una cuenta?</p>
              <Link className="signup" to={"/login/signUp"}>
                Registrate
              </Link>
            </span>

            <Link to={"/"}>
              <span className="back">
                <ArrowBackIcon />
                <p>Volver al inicio</p>
              </span>
            </Link>
          </form>
        </div>

        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
      </SignInLayout>
    </div>
  );
};

export default SignIn;
