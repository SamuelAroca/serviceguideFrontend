import styles from '../styled-sheets/Register.module.css';
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";
import { RiEyeLine } from "react-icons/ri";

window.onload = f => {
  var eye = document.getElementById('Eye');
  var input = document.getElementById('Input');

  f.preventDefault();
  eye.onclick = e => {
    e.preventDefault();
    if (input.value.length > 0) {
      if (input.type == 'password') {
        input.type = 'text'
        eye.style.opacity = 0.8
      } else {
        input.type = 'password'
        eye.style.opacity = 0.4
      }
    } else {
      console.log('Paila');
    }
  }
}

const Register = () => {
  return (
    <div className={styles.main}>
      <div className={styles.components}>
        <div className={styles.container_image}>
        <CarouselDemo />
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
                  type="password" 
                  placeholder="Password"
                  id="Input"/>
                  <RiEyeLine className={styles.icon_password} id="Eye" />
              </div>
              <p className={styles.subtitle}>already have an account?</p>
              <a className={styles.sign_in} href="">Sign in</a>
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