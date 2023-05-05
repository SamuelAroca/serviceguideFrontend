import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";

export const DeleteButton = ({ path, id, getInformation }) => {
  const apiUrl = "http://localhost:8080";

  const [loading, setLoading] = useState(false);

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
        onClick={() => onDelete()}
      >
        Delete
      </Button>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default DeleteButton;
