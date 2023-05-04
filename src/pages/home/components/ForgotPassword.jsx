import React, { useState } from "react";
import styles from "../styles/ForgotPassword.module.css";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "../../../components/CarouselDemo";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.jpg";
import img2 from "../../../assets/alcantarillado.jpg";
import img3 from "../../../assets/Electricistas-scaled.jpg";
import img4 from "../../../assets/gas-natural.jpeg";
import axios from "axios";
import { Alert } from "@mui/material";

const ForgotPassword = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    mailTo: "",
  });

  const url = "http://localhost:8080/api/email/send-email";

  const onValidate = () => {
    let errors = {};
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar precios

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
        let response = await axios.post(url, email);

        if (response.status != 200) {
          throw new alert("Login Error");
        } else {
          Swal.fire(
            "E-mail sent!",
            "Go to your email and check the email we sent you!, Check spam",
            "success"
          );
          /* navigate("/"); */
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
          Login
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.container_login}>
          <form className={styles.container_form} onSubmit={sendEmail}>
            <h2 className={styles.container_logo}>
              <RiWaterFlashFill className={styles.logo} />
              ServiceGuide
            </h2>
            <h2 className={styles.title_sign}>Forgot Password</h2>
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
              <div className={styles.div_button_login}>
                <button className={styles.login_button} onClick={sendEmail}>
                  Send Email
                  <div class={styles.arrow_wrapper}>
                    <div class={styles.arrow}></div>
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
