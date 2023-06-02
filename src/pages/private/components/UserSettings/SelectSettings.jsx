import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { getToken, initAxiosInterceptor } from "../../../../AxiosHelper";
import axios from "axios";
import styles from "./styles/SelectSettings.module.css";
import { MyContext } from "../../../../context/UserContext";

const SelectSettings = () => {
  const [setting, setSetting] = useState("");
  const [anchorEl, setAnchorEl] = useState("");

  const { user } = useContext(MyContext);

  const navigate = useNavigate();

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
      navigate("/user/settings/update");
    } else if (option === "Cerrar sesión") {
      console.log("Cerrar Sesión");
      handleLogOut();
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Do you want to log out?",
      text: "You will have to log in again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        navigate("/");
      }
    });
  };

  /* loadUserByToken(); */
  /* {username} <MdSettings className={styled.logo_settings} onClick={() => {<Select />}} /> */
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        <div className={styles.div_name}>
          {user}
          <MdSettings className={styles.logo_setting} />
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
