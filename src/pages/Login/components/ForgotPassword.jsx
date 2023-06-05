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
      <div className={styles.div_home_button}>
        <button
          className={styles.home_button}
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.container_login}>
          <form className={styles.container_form} onSubmit={sendEmail}>
            <div className={styles.container_logo}>
              <h2 className={styles.logo_title}>
                <RiWaterFlashFill className={styles.logo} />
                ServiceGuide
              </h2>
            </div>
            <h2 className={styles.title_sign}>Recuperar Contraseña</h2>
            <div className={styles.container_label}>
              <div className={styles.inputs_gap}>
                <div>
                  <TextField
                    label="Email"
                    variant="outlined"
                    placeholder="Type your email"
                    className={styles.inputsMaterial}
                    fullWidth
                    name="mailTo"
                    value={email.mailTo}
                    onChange={handleInputChange}
                  />
                  {errors.mailTo && (
                    <Alert severity="warning"> {errors.mailTo} </Alert>
                  )}
                </div>
              </div>
              <div className={styles.login}>
                ¿Recordaste tu contraseña?{" "}
                <Link to="/login">Iniciar Sesión</Link>
              </div>
              <div className={styles.div_button_login}>
                <button className={styles.login_button} onClick={sendEmail}>
                  Enviar Correo
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

export default ForgotPassword;
