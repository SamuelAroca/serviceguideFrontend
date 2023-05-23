import React, { useState } from "react";
import styles from "../styles/ChangePasword.module.css";
import { RiWaterFlashFill, RiEyeLine } from "react-icons/ri";
import CarouselDemo from "../../../components/CarouselDemo";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.jpg";
import img2 from "../../../assets/alcantarillado.jpg";
import img3 from "../../../assets/Electricistas-scaled.jpg";
import img4 from "../../../assets/gas-natural.jpeg";
import axios from "axios";
import { Alert } from "@mui/material";

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
            text: "The password has been successfully updated",
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
          <form className={styles.container_form} onSubmit={changePassword}>
            <h2 className={styles.container_logo}>
              <RiWaterFlashFill className={styles.logo} />
              ServiceGuide
            </h2>
            <h2 className={styles.title_sign}>Forgot Password</h2>
            <div className={styles.container_label}>
              <div className={styles.inputs_gap}>
                <div>
                  <TextField
                    label="New Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your new password"
                    className={styles.inputsMaterial}
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
                    label="Confirm Password"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className={styles.inputsMaterial}
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
              </div>
              <div className={styles.div_button_login}>
                <button
                  className={styles.login_button}
                  onClick={changePassword}
                >
                  Change Password
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

export default ChangePasword;
