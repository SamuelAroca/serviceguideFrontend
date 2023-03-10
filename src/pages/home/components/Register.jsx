import styles from "../styles/Register.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "../../../components/CarouselDemo.jsx";
import { RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import img1 from "../../../assets/agua-potable.jpg";
import img2 from "../../../assets/alcantarillado.jpg";
import img3 from "../../../assets/Electricistas-scaled.jpg";
import img4 from "../../../assets/gas natural.jpeg";
import TextField from "@mui/material/TextField";

const Register = ({open, setOpen}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.components}>
      <AiOutlineClose
        onClick={() => setOpen(!open)}
        className={styles.close_button}
      />
      <div className={styles.container_image}>
        <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
      </div>
      <div className={styles.container_register}>
        <form className="container_form">
          <h2 className={styles.container_logo}>
            <RiWaterFlashFill className={styles.logo} />
            ServiceGuide
          </h2>
          <h2 className={styles.title_signUp}>Sign Up</h2>
          <div className={styles.container_label}>
            <div className={styles.inputs_gap}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                placeholder="Type your email"
                fullWidth
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                placeholder="Type your email"
                fullWidth
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                placeholder="Type your email"
                fullWidth
                size="small"
              />
              <div className={styles.password_container}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  fullWidth
                  size="small"
                />
                <RiEyeLine
                  className={styles.icon_password}
                  onClick={handleShow}
                />
              </div>
            </div>

            <div className={styles.links}>
              <p className={styles.subtitle}>already have an account?</p>
              <a className={styles.sign_in} href="/login">
                Sign in
              </a>
            </div>

            <button className={styles.btn_register}>
              Sign Up
              <RiArrowRightSLine className={styles.icon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
