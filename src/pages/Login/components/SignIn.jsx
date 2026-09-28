import { useState, useContext, useEffect } from "react";
import styles from "../styles/Login.module.css";
import CarouselDemo from "../../../components/CarouselDemo";
import TextField from "@mui/material/TextField";
import img1 from "../../../assets/agua-potable.webp";
import img2 from "../../../assets/alcantarillado.webp";
import img3 from "../../../assets/Electricistas-scaled.webp";
import img4 from "../../../assets/gas-natural.webp";
import httpClient from "../../../api/httpClient";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RiWaterFlashFill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { Alert } from "@mui/material";
import { getUserDataService } from "../../../services/get-user-data.service";
import { MyContext } from "../../../context/UserContext";
import Cookies from "js-cookie";
import Swal from "../../../lib/swal";
import { AuthLayout } from "../../../styled-components/auth-layout.styled";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { getErrorMessage, isValidEmail } from "../../../Utilities";

const SignIn = () => {
  // Logica para obtener los datos del usuario
  const { updateUserData } = useContext(MyContext);

  const getUserData = async () => {
    try {
      const data = await getUserDataService();
      updateUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const url = import.meta.env.VITE_API_AUTH;

  useEffect(() => {
    if (searchParams.get("reason") === "session-expired") {
      Swal.fire({
        icon: "info",
        title: "Tu sesión expiró",
        text: "Iniciaste sesión en otro lugar o tu sesión ya no es válida. Vuelve a iniciar sesión.",
      });
      setSearchParams({}, { replace: true });
    }
  }, []);

  const onValidate = () => {
    let errors = {};

    if (!email.email.trim()) {
      errors.email = "No puede estar vacio";
    } else if (!isValidEmail(email.email)) {
      errors.email = "Debe tener un formato de correo electrónico válido";
    }

    if (!email.password.trim()) {
      errors.password = "No puede estar vacio";
    }
    return errors;
  };

  const login = async (e) => {
    e.preventDefault();
    const err = onValidate(email);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        let response = await httpClient.post(`${url}/login`, email);

        if (response.status === 200) {
          const currentDate = new Date();
          const expirationDate = new Date(currentDate.getTime() + 24 * 60 *60 * 1000);
          Cookies.set("token", response.data.token, {
            expires: expirationDate,
            secure: window.location.protocol === "https:",
            sameSite: "lax",
          });
          getUserData();
          navigate("/private/major/home/");
        }
      } catch (error) {
        console.log(error);
        // footer se pasa como HTMLElement (no como string) para que
        // SweetAlert2 lo inserte con appendChild en vez de innerHTML:
        // si en el futuro este bloque cambia y termina metiendo texto
        // dinamico ahi, no hay forma de que se interprete como HTML.
        const footerLink = document.createElement("a");
        footerLink.href = "/forgot-password";
        footerLink.textContent = "¿Has olvidado tu contraseña?";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: getErrorMessage(error),
          footer: footerLink,
        });
      }
      setEmail({
        email: "",
        password: "",
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

  const inputProps = {
    style: {
      borderRadius: "4px", // Cambia el valor según el border radius deseado
    },
  };

  return (
    <div className={styles.components}>
      <AuthLayout $gap="2rem">
        <div className="form_container">
          <form onSubmit={login}>
            <h1>¡Bienvenido de nuevo!</h1>
            <p className="subtitle">
              Empieza a gestionar tus finanzas más rápido y mejor
            </p>
            <div>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                placeholder="Digíta tu correo"
                className="inputsMaterial"
                fullWidth
                size="small"
                name="email"
                value={email.email}
                onChange={handleInputChange}
                InputProps={inputProps}
                /* style={{ borderRadius: "2rem" }} */
              />
              {errors.email && (
                <Alert severity="warning"> {errors.email} </Alert>
              )}
            </div>

            <div className={styles.password_container}>
              <TextField
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="Digíta tu contraseña"
                fullWidth
                size="small"
                className="inputsMaterial"
                name="password"
                value={email.password}
                InputProps={inputProps}
                onChange={handleInputChange}
              />
              {errors.password && (
                <Alert severity="warning"> {errors.password} </Alert>
              )}
              <RiEyeLine
                className={styles.icon_password}
                onClick={handleShow}
              />
            </div>

            <Link className="forgot_password" to={"/login/forgot-password"}>
              ¿Olvidaste tu contraseña?
            </Link>

            <div>
              <button onClick={login}>
                Iniciar sesión
                <div className={styles.arrow_wrapper}>
                  <div className={styles.arrow}></div>
                </div>
              </button>
            </div>

            <span className="signup" to={"/login/signUp"}>
              <p>¿Aún no tienes una cuenta?</p>
              <Link className="signup" to={"/login/signUp"}>
                Registrate
              </Link>
            </span>

            <Link to={"/"}>
              <span className="back">
                <ArrowBackIcon />
                <p>Volver al inicio</p>
              </span>
            </Link>
          </form>
        </div>

        <div className={styles.carouselDemo}>
          <CarouselDemo img1={img1} img2={img2} img3={img3} img4={img4} />
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
