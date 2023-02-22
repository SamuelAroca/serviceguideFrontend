import "../styled-sheets/Register.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWaterFlashFill } from "react-icons/ri";
import CarouselDemo from "./CarouselDemo.jsx";

const Register = () => {
  return (
    <div className="main-container">
      <div className="container_image">
        <CarouselDemo />
      </div>
      <form className="form-container">
        <h2 className="container_logo"><RiWaterFlashFill className="title-image" />ServiceGuide</h2>
        <div className="container-write">
          <h2 className="title">Sign Up</h2>
          <div className="container-register">
            <div className="input-name-lastname">
              <div>
                <label className="lbl-title">Name</label>
                <input className="form-control" type="text" placeholder="Name" />
              </div>
              <div>
                <label className="lbl-title">Last Name</label>
                <input className="form-control" type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="input-email">
              <label htmlFor="">Email</label>
              <input className="form-control" type="email" placeholder="email" />
            </div>
            <div className="input-password">
              <label htmlFor="">Password</label>
              <input className="form-control" type="password" placeholder="Password" />
            </div>
          </div>
          <p>Have already an account?</p>
          <a href="">Sign in</a>
          <button className="btn-login">
            SignUp
            <RiArrowRightSLine className="icon" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register;