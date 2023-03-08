import styles from "../styled-sheets/Register.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";
import { RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import img1 from "../assets/agua-potable.jpg";
import img2 from "../assets/alcantarillado.jpg";
import img3 from "../assets/Electricistas-scaled.jpg";
import img4 from "../assets/gas natural.jpeg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.main}>
      <div className={styles.components}>
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
              <label className={styles.lbl_title}>Name</label>
              <input className="form-control" type="text" placeholder="Name" />

              <label className={styles.lbl_title}>Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
              />

              <label className={styles.lbl_title}>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
              />
              <label className={styles.lbl_title}>Password</label>

              <div className={styles.password_container}>
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <RiEyeLine
                  className={styles.icon_password}
                  onClick={handleShow}
                />
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
    </div>
  );
};

export default Register;
