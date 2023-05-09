import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import toast, { Toaster } from "react-hot-toast";


const UpdateButton = ({ path, id, getInformation }) => {
  const apiUrl = "http://localhost:8080";
  
  const notify = () => toast.succes("Updated successfully");

  const onUpdate = async () => {
    const data = await axios.put(`${apiUrl}/api/${path}/update/${id}`);
    try {
      getInformation();
      notify();
      console.log("Datos actualizados correctamente");
    } catch (error) {
      console.log("Error al actulizar los datos", error);
    }
  }

  return(
    <>
      <Button
        variant="contained"
        startIcon={<SystemUpdateAltIcon />}
        onClick={() => onUpdate()}
      >
        Update
      </Button>
    </>
  );
}

export default UpdateButton;