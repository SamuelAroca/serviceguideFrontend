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
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import NavbarComp from "../../../components/NavbarComp";

const Register = ({ open, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openLogin, setOpenLogin] = useState(false);

  const registerAlert = () => {
    Swal.fire("Successfully registered user", "", "success", {
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Ok",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/major");
      }
    });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:8080/api/users/auth/register",
        {
          firstName: name,
          lastName: lastName,
          login: email,
          password: password,
        }
      );

      if (response.status != 201) {
        setOpen(!open);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } else {
        document.cookie = `token=${
          response.data.token
        }; max-age=${3600}; path=/; samesite=strict`;
        setOpen(!open);
        registerAlert();
      }
    } catch (error) {
      alert(error);
    }
  };

  const toggleModal = () => {
    setOpenLogin(!openLogin);
    setTimeout(() => {
      setOpen(!open);
      console.log("holas");
    }, 100);
  };

  return (
    <div className={styles.components}>
      <div className={styles.container}>
        <Modal open={openLogin} setOpen={setOpenLogin} />
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
                  label="Name"
                  variant="outlined"
                  placeholder="Type your email"
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField
                  label="Last name"
                  variant="outlined"
                  placeholder="Type your email"
                  fullWidth
                  size="small"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  placeholder="Type your email"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className={styles.password_container}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password"
                    fullWidth
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <RiEyeLine
                    className={styles.icon_password}
                    onClick={handleShow}
                  />
                </div>
              </div>

              <div className={styles.links}>
                <p className={styles.subtitle}>already have an account?</p>
                <Link className={styles.sign_in} onClick={() => toggleModal()}>
                  Sign in
                </Link>
              </div>

              <button className={styles.btn_register} onClick={save}>
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
