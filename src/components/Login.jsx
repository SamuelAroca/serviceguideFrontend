import "../styled-sheets/Login.css";
import { RiArrowRightSLine } from "react-icons/ri";

const Login = () => {
  return (
    <div className="main">
      <div className="container-login">
        <form className="container-form">
          <h2 className="title-sign">Sign in</h2>
          <div className="container-label">
            <label className="label-title">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Type your email"
            />
            <label className="label-title">Password</label>
            <input
              className="input-password form-control"
              type="password"
              placeholder="Type your password"
            />
            <a href="forgot-password" className="forgot-password">
              Forgot password?
            </a>
            <button className="btn-login">
              LOGIN
              <RiArrowRightSLine className="icon" />
            </button>
          </div>
        </form>
      </div>
      <div className="container-image">
        
      </div>
    </div>
  );
};

export default Login;