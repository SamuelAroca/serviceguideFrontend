import styles from '../styled-sheets/Register.module.css';
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";
import { RiEyeLine } from "react-icons/ri";
import { useState } from 'react';
import losLindos from '../assets/AyJ.jpg';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false)

  const handleShow = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.components}>
        <div className={styles.container_image}>
        <CarouselDemo img1={losLindos}/>
        </div>
        <div className={styles.container_register}>
          <form className="container_form">
            <h2 className={styles.container_logo}>
              <RiWaterFlashFill className="logo" />
              ServiceGuide
            </h2>
            <h2 className={styles.title_signUp}>Sign Up</h2>
            <div className={styles.container_label}>
              <div className={styles.input_name_last}>
                <div>
                  <label className={styles.lbl_title}>Name</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    placeholder="Name" />
                </div>
                <div>
                  <label className={styles.lbl_title}>Last Name</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    placeholder="Last name"/>
                </div>
              </div>

              <label className={styles.lbl_title}>Email</label>
              <input 
                className="form-control" 
                type="email" 
                placeholder="Email" />
              <label className={styles.lbl_title}>Password</label>
              <div className={styles.password_container}>
                <input 
                  className="form-control" 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                />
                  <RiEyeLine className={styles.icon_password} onClick={handleShow} />
              </div>
              <p className={styles.subtitle}>already have an account?</p>
              <a className={styles.sign_in} href="/login">Sign in</a>
              <button className={styles.btn_register}>
                Sign Up
                <RiArrowRightSLine className={styles.icon} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;