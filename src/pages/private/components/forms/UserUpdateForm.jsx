import React, { useEffect, useState } from "react";
import { FormLayout } from "../../styled-components/form-layout.styled";
import { Grid, TextField, Tooltip } from "@mui/material";
import { getToken, initAxiosInterceptor } from "../../../../AxiosHelper";
import axios from "axios";

const UserUpdateForm = () => {
  const url = import.meta.env.VITE_API_USER;
  const [user, setUser] = useState([]);

  const loadUser = async (e) => {
    e.preventDefault();
    try {
      let accessToken = getToken();
      const userData = await axios.get(
        `${url}/findById/${accessToken}`
      );
      setUser(userData.data);
      console.log(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initAxiosInterceptor();
  }, [user]);

  const handleSubmit = () => {};

  return (
    <FormLayout>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add First Name"
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                type="text"
              />
            </Tooltip>
          </Grid>
        </Grid>
        <button onClick={loadUser}>BOTON</button>
      </form>
    </FormLayout>
  );
};

export default UserUpdateForm;
