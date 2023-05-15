import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";

export const DeleteButton = ({ path, id, getInformation }) => {

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "This item is deleted forever",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
  };

  const apiUrl = "http://localhost:8080";

  const notify = () => toast.success("Deleted successfully.");

  const onDelete = async () => {
    const data = await axios.delete(`${apiUrl}/api/${path}/delete/${id}`);
    try {
      getInformation();
      notify();
      console.log("Los datos se eliminaron correctamente");
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() => handleLogOut()}
      >
        Delete
      </Button>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default DeleteButton;
