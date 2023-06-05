import { React, useEffect, useState, useContext } from "react";
import { FormLayout } from "../../addReceipt/Components/styled-components/form-layout.styled";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { getToken, initAxiosInterceptor } from "../../../AxiosHelper";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MyContext } from "../../../context/UserContext";

const UserUpdateForm = () => {
  const url = import.meta.env.VITE_API_USER;
  const [message, setMessagge] = useState("");
  const notify = () => toast.success(message.message);
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
    setUser({ ...user, [name]: value });
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
      setMessagge(updatedUser.data);
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

  return (
    <FormLayout>
      <h1>Actualizar Datos del Usuario</h1>
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
                onChange={(e) => {
                  handleChange(e);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                }}
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
                type="text"
                value={user.email}
                onChange={(e) => {
                  handleChange(e);
                }}
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
                label="Contraseña"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }} item xs={12}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              style={{width: "20%"}}
            >
              Save Receipt
            </Button>
          </Grid>
      </form>
    </FormLayout>
  );
};

export default UserUpdateForm;
