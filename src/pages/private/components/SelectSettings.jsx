import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { getToken, initAxiosInterceptor } from "../../../AxiosHelper";
import axios from "axios";

const SelectSettings = () => {
  const [setting, setSetting] = useState("");
  const [anchorEl, setAnchorEl] = useState("");

  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const url = import.meta.env.VITE_API_AUTH;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (option) => {
    setSetting(option);
    handleClose();
    if (option === "Ajustes") {
      console.log("Ajustes de usuario");
    } else if (option === "Cerrar sesión") {
      console.log("Cerrar Sesión");
    }
  };

  const loadUserByToken = async () => {
    try {
      let accessToken = getToken();
      const { data: user } = await axios.get(`${url}/myName/${accessToken}`);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserByToken();
  }, []);
  /* loadUserByToken(); */
  /* {username} <MdSettings className={styled.logo_settings} onClick={() => {<Select />}} /> */
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        <div>
          {username}
          <MdSettings />
        </div>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleChange("Ajustes")}>Ajustes</MenuItem>
        <MenuItem onClick={() => handleChange("Cerrar sesión")}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SelectSettings;
