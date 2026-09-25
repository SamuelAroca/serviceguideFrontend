import styles from "../styles/SignUp.module.css";
import CarouselDemo from "../../../components/CarouselDemo.jsx";
import TextField from "@mui/material/TextField";
import httpClient from "../../../api/httpClient";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import { RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { RiWaterFlashFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import { AuthLayout } from "../../../styled-components/auth-layout.styled";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { getErrorMessage, isValidEmail } from "../../../Utilities";

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
  const [errors, setErrors] = useState({});

  const url = import.meta.env.VITE_API_AUTH;

  const onValidate = () => {
    const errors = {};

    if (!name.trim()) errors.name = "Debes poner un nombre";
    if (!lastName.trim()) errors.lastName = "Debes poner un apellido";
    if (!email.trim()) {
      errors.email = "Debes poner un email";
    } else if (!isValidEmail(email)) {
      errors.email = "Debe tener un formato de correo electrónico válido";
    }
    if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    return errors;
  };

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
    const err = onValidate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
      const response = await httpClient.post(`${url}/register`, {
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        registerAlert();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error),
      });
    }
  };

  const inputProps = {
    style: {
      borderRadius: "4px", // Cambia el valor según el border radius deseado
    },
  };

  return (
    <div className={styles.components}>
      <AuthLayout>
        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
        <div className="form_container">
          <form onSubmit={save}>
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
            {errors.name && <Alert severity="warning">{errors.name}</Alert>}
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
            {errors.lastName && (
              <Alert severity="warning">{errors.lastName}</Alert>
            )}
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
            {errors.email && <Alert severity="warning">{errors.email}</Alert>}
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
            {errors.password && (
              <Alert severity="warning">{errors.password}</Alert>
            )}
            <div>
              <button onClick={save}>
                Registrarse
                <div className={styles.arrow_wrapper}>
                  <div className={styles.arrow}></div>
                </div>
              </button>
            </div>

            <span className="signup">
              <p>¿Ya tienes una cuenta?</p>
              <Link className="forgot_password" to={"/login/signIn"}>
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
      </AuthLayout>
    </div>
  );
};

export default SignUp;
