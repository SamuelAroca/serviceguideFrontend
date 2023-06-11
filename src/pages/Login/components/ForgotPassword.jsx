import React, { useState } from "react";
import styles from "../styles/ForgotPassword.module.css";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "../../../components/CarouselDemo";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import axios from "axios";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import { ForgotPasswordLayout } from "../styled-components/forgotpassword-layout";

const ForgotPassword = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    mailTo: "",
  });

  const url = import.meta.env.VITE_API_EMAIL;

  const onValidate = () => {
    let errors = {};
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar email

    if (!email.mailTo.trim()) {
      errors.mailTo = "Debes poner un email";
    } else if (!regexEmail.test(email.mailTo)) {
      errors.mailTo = "You must have a valid email format";
    }
    return errors;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const err = onValidate(email);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        let response = await axios.post(`${url}/send-email`, email);

        if (!response.status != 200) {
          Swal.fire(
            "E-mail sent!",
            "Go to your email and check the email we sent you!, Check spam",
            "success"
          );
        }
      } catch (error) {
        let response = error;
        console.log(response.response.data.message);
        let message = response.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      }

      setEmail({
        mailTo: "",
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
      <ForgotPasswordLayout>
        <div className="form_container">
          <form onSubmit={sendEmail}>
            <h1>Recuperar Contraseña</h1>
            <p className="subtitle">
              No worries, we'll send you reset instructions
            </p>
            {/* <div className={styles.container_logo}>
              <h2 className={styles.logo_title}>
                <RiWaterFlashFill className={styles.logo} />
                ServiceGuide
              </h2>
            </div> */}

            <div>
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Type your email"
                className="inputsMaterial"
                fullWidth
                name="mailTo"
                value={email.mailTo}
                onChange={handleInputChange}
              />
              {errors.mailTo && (
                <Alert severity="warning"> {errors.mailTo} </Alert>
              )}
            </div>
            <div>
              <button onClick={sendEmail}>
                Enviar Correo
              </button>
            </div>

            <span className="signup">
              <p>¿Recordaste tu contraseña?</p>
              <Link to="/login">
                Iniciar Sesión
              </Link>
            </span>

          </form>
        </div>
        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
      </ForgotPasswordLayout>
    </div>
  );
};

export default ForgotPassword;
