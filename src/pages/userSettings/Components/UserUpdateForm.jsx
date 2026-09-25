import { useEffect, useState, useContext } from "react";
import { FormLayout } from "../../addReceipt/Components/styled-components/form-layout.styled";
import { Alert, Button, Grid, TextField } from "@mui/material";
import httpClient from "../../../api/httpClient";
import toast from "react-hot-toast";
import { MyContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/UserSettings.module.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { getErrorMessage, isValidEmail } from "../../../Utilities";

const UserUpdateForm = () => {
  const url = import.meta.env.VITE_API_USER;
  const notify = () => toast.success("Usuario actualizado correctamente");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { updateUserData, userData } = useContext(MyContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value || "" });
  };

  const loadUser = async () => {
    try {
      const dataUser = await httpClient.get(`${url}/loadUser/${userData.id}`);
      setUser({
        email: dataUser.data.email,
        firstName: dataUser.data.firstName,
        id: dataUser.data.id,
        lastName: dataUser.data.lastName,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", title: "Oops...", text: getErrorMessage(error) });
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onValidate = () => {
    const errors = {};

    if (!user.firstName.trim()) errors.firstName = "Debes poner un nombre";
    if (!user.lastName.trim()) errors.lastName = "Debes poner un apellido";
    if (!user.email.trim()) {
      errors.email = "Debes poner un email";
    } else if (!isValidEmail(user.email)) {
      errors.email = "Debe tener un formato de correo electrónico válido";
    }
    // Vacio = no cambiar la contrasena; si trae algo, exige el minimo del backend.
    if (user.password && user.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = onValidate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
      // No se manda el campo password si esta vacio: en vez de confiar en
      // que el backend interprete "" como "no cambiar la contraseña",
      // directamente no se envia, asi no depende de ese contrato implicito.
      const { password, ...rest } = user;
      const payload = password ? user : rest;
      const updatedUser = await httpClient.put(
        `${url}/update/${userData.id}`,
        payload
      );
      if (updatedUser.status === 200) {
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        Cookies.set("token", updatedUser.data.token, {
          expires: expirationDate,
          secure: window.location.protocol === "https:",
          sameSite: "lax",
        });
        notify();
        updateUserData(`${user.firstName} ${user.lastName}`);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", title: "Oops...", text: getErrorMessage(error) });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: `¿Deseas eliminar tu usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar usuario",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await httpClient.delete(`${url}/delete/${userData.id}`);
          notify();
          Cookies.remove("token");
          navigate("/");
        } catch (error) {
          console.log(error.message);
          Swal.fire({ icon: "error", title: "Oops...", text: getErrorMessage(error) });
        }
      }
    });
  };

  if (isLoadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <FormLayout>
      <h1 className={styles.h1}>Actualizar Datos del Usuario</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="firstName"
              type="text"
              value={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <Alert severity="warning">{errors.firstName}</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apellido"
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <Alert severity="warning">{errors.lastName}</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && <Alert severity="warning">{errors.email}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              placeholder="Déjalo en blanco para no cambiarla"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && (
              <Alert severity="warning">{errors.password}</Alert>
            )}
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
          item
          xs={12}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Actualizar
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default UserUpdateForm;
