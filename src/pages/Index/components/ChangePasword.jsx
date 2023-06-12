import React, { useState } from "react";
import styles from "../styles/ChangePasword.module.css";
import { RiWaterFlashFill, RiEyeLine } from "react-icons/ri";
import CarouselDemo from "../../../components/CarouselDemo";
import { useNavigate, useParams, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import axios from "axios";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import { ChangePasswordLayout } from "../styled-components/changepassword-layout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChangePasword = () => {
  let params = useParams();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
    tokenPassword: params.passwordToken,
  });

  const url = import.meta.env.VITE_API_EMAIL;

  const onValidate = () => {
    let errors = {};

    if (!password.password.trim()) {
      errors.password = "Debes poner una contraseña";
    }
    if (!password.confirmPassword.trim()) {
      errors.confirmPassword = "Debes confirmar la contraseña";
    } else if (password.password != password.confirmPassword) {
      errors.confirmPassword = "Las contraseñas deben coincidir";
    }
    return errors;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const err = onValidate(password);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        let response = await axios.post(`${url}/change-password`, password);
        let message = response.data.message;
        if (response.status == 200) {
          Swal.fire({
            title: message,
            text: "La contraseña ha sido actualizada con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      } catch (error) {
        let response = error;
        let message = response.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      }

      setPassword({
        password: "",
        confirmPassword: "",
        tokenPassword: "",
      });
    } else {
      setErrors(err);
    }
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  }

  return (
    <div className={styles.components}>
      <ChangePasswordLayout>
        <div className="form_container">
          <form onSubmit={changePassword}>
            <h1>Cambiar contraseña</h1>
            <p className="subtitle">
              Introduce una nueva contraseña
            </p>
              <div className={styles.confirmPassword}>
                <TextField
                  label="Nueva cotraseña"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa una nueva contraseña"
                  className="inputsMaterial"
                  fullWidth
                  name="password"
                  value={password.password}
                  onChange={handleInputChange}
                />
                <RiEyeLine
                  className={styles.icon_password}
                  onClick={handleShow}
                />
                {errors.password && (
                  <Alert severity="warning"> {errors.password} </Alert>
                )}
              </div>
              <div className={styles.confirmPassword}>
                <TextField
                  label="Confirmar Contraseña"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  className="inputsMaterial"
                  fullWidth
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handleInputChange}
                />
                <RiEyeLine
                  className={styles.icon_password2}
                  onClick={handleShowConfirm}
                />
                {errors.confirmPassword && (
                  <Alert severity="warning"> {errors.confirmPassword} </Alert>
                )}
              </div>
              <div>
                <button onClick={changePassword}>
                  Cambiar contraseña
                </button>
              </div>
              
              <Link to={"/login/signIn"}>
                <span className="back">
                  <ArrowBackIcon />
                  <p>Volver para iniciar sesión</p>
                </span>
              </Link>

          </form>
        </div>
        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
      </ChangePasswordLayout>
    </div>
  );
};

export default ChangePasword;
