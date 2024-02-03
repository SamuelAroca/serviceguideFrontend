import styles from "../styles/SignUp.module.css";
import CarouselDemo from "../../../components/CarouselDemo.jsx";
import TextField from "@mui/material/TextField";
import axios from "axios";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import { RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { RiWaterFlashFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SignUpLayout } from "../styled-components/signup-layout.styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = import.meta.env.VITE_API_AUTH;

  const registerAlert = () => {
    Swal.fire("Usuario registrado satisfactoriamente", "", "success", {
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Ok",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login/signin");
      }
    });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${url}/register`, {
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (response.status == 200) {
        registerAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputProps = {
    style: {
      borderRadius: "4px", // Cambia el valor según el border radius deseado
    },
  };

  return (
    <div className={styles.components}>
      <SignUpLayout>
        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
        <div className="form_container">
          <form>
            <h1>Registro</h1>
            <p className="subtitle">
              Empieza a gestionar tus finanzas más rápido y mejor
            </p>
            <TextField
              className="inputsMaterial"
              label="Nombre"
              variant="outlined"
              placeholder="Digíta tu nombre"
              fullWidth
              size="small"
              value={name}
              InputProps={inputProps}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              className="inputsMaterial"
              label="Apellido"
              variant="outlined"
              placeholder="Digíta tu apellido"
              fullWidth
              size="small"
              value={lastName}
              InputProps={inputProps}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <TextField
              className="inputsMaterial"
              label="Correo electrónico"
              variant="outlined"
              placeholder="Digíta tu correo"
              fullWidth
              size="small"
              value={email}
              InputProps={inputProps}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className={styles.password_container}>
              <TextField
                className="inputsMaterial"
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="Digíta tu contraseña"
                fullWidth
                size="small"
                value={password}
                InputProps={inputProps}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <RiEyeLine
                className={styles.icon_password}
                onClick={handleShow}
              />
            </div>
            <div>
              <button onClick={save}>
                Registrarse
                <div class={styles.arrow_wrapper}>
                  <div class={styles.arrow}></div>
                </div>
              </button>
            </div>

            <span className="signup">
              <p>¿Ya tienes una cuenta?</p>
              <Link className="forgot_password" to={"/login"}>
                Iniciar sesión
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
      </SignUpLayout>
    </div>
  );
};

export default SignUp;
