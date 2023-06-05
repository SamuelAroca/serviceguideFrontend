import React, { useEffect, useState, useContext } from "react";
import { FormLayout } from "../../addReceipt/Components/styled-components/form-layout.styled";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { getToken, initAxiosInterceptor } from "../../../AxiosHelper";
import axios from "axios";
import toast from "react-hot-toast";
import { MyContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/UserSettings.module.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const UserUpdateForm = () => {
  const url = import.meta.env.VITE_API_USER;
  const [message, setMessage] = useState("");
  const notify = () => toast.success("Usuario actualizado correctamente");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    password: "",
  });

  const { updateUserData } = useContext(MyContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value || "" });
  };

  const loadUser = async () => {
    try {
      const accessToken = getToken();
      const userData = await axios.get(`${url}/findById/${accessToken}`);
      setUser({
        email: userData.data.email,
        firstName: userData.data.firstName,
        id: userData.data.id,
        lastName: userData.data.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initAxiosInterceptor();
    loadUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const accessToken = getToken();
      const updatedUser = await axios.put(`${url}/update/${accessToken}`, user);
      setMessage(updatedUser.data);
      if (updatedUser.status === 200) {
        document.cookie = `token=${updatedUser.data.token}; max-age=${
          3600 * 5
        }; path=/; samesite=strict`;
        notify();
        updateUserData(`${user.firstName} ${user.lastName}`);
      }
      console.log(message.message);
    } catch (error) {
      console.log(error);
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
          const accessToken = getToken();
          await axios.delete(`${url}/delete/${accessToken}`);
          notify();
          Cookies.remove("token")
          navigate("/")
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  if (!user.email || !user.firstName || !user.lastName) {
    return <p>Loading...</p>;
  }

  return (
    <FormLayout>
      <h1 className={styles.h1}>Actualizar Datos del Usuario</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Nombre"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                name="firstName"
                type="text"
                value={user.firstName}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Apellido"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                name="lastName"
                type="text"
                value={user.lastName}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Email"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Contraseña"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }} item xs={12}>
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
