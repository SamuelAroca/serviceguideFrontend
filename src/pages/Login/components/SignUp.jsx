import styles from "../styles/SignUp.module.css";
import CarouselDemo from "../../../components/CarouselDemo.jsx";
import TextField from "@mui/material/TextField";
import axios from "axios";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import { RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { RiWaterFlashFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SignUpLayout } from "../styled-components/signup-layout.styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = import.meta.env.VITE_API_AUTH;

  const registerAlert = () => {
    Swal.fire("Successfully registered user", "", "success", {
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Ok",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/private/major/home/");
      }
    });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${url}/register`, {
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (response.status == 201) {
        document.cookie = `token=${response.data.token}; max-age=${
          3600 * 5
        }; path=/; samesite=strict`;
        registerAlert();
      }
    } catch (error) {
      alert(error);
    }
  };

  const inputProps = {
    style: {
      borderRadius: "4px", // Cambia el valor según el border radius deseado
    },
  };

  return (
    <div className={styles.components}>
      <SignUpLayout>
        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
        <div className="form_container">
          <form>
            <h1>Sign Up</h1>
            <p className="subtitle">
              Start management your finance faster and better
            </p>

            {/* <h2 className={styles.container_logo}>
              <RiWaterFlashFill className={styles.logo} />
              ServiceGuide
            </h2> */}


            <TextField
              className="inputsMaterial"
              label="Name"
              variant="outlined"
              placeholder="Type your email"
              fullWidth
              size="small"
              value={name}
              InputProps={inputProps}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              className="inputsMaterial"
              label="Last name"
              variant="outlined"
              placeholder="Type your email"
              fullWidth
              size="small"
              value={lastName}
              InputProps={inputProps}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <TextField
              className="inputsMaterial"
              label="Email"
              variant="outlined"
              placeholder="Type your email"
              fullWidth
              size="small"
              value={email}
              InputProps={inputProps}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className={styles.password_container}>
              <TextField
                className="inputsMaterial"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password"
                fullWidth
                size="small"
                value={password}
                InputProps={inputProps}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <RiEyeLine
                className={styles.icon_password}
                onClick={handleShow}
              />
            </div>


            <div>
              <button onClick={save}>
                Sign up
                <div class={styles.arrow_wrapper}>
                  <div class={styles.arrow}></div>
                </div>
              </button>
            </div>

            <span className="signup">
              <p>Already have an account?</p>
              <Link className="forgot_password" to={"/login"}>
                Sign in
              </Link>
            </span>
            
            <Link to={"/"}>
              <span className="back">
                <ArrowBackIcon />
                <p>Back to home</p>
              </span>
            </Link>

          </form>
        </div>
      </SignUpLayout>
    </div>
  );
};

export default SignUp;
