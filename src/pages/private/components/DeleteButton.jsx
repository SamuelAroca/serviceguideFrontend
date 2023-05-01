import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteButton = (props) => {

  const apiUrl = "http://localhost:8080";

  const handleDelete = async () =>{
    try {
      await axios.delete(`${apiUrl}/api/house/delete/${props.id}`);
      props.onDelete();
    } catch (error) {
      console.error('Error al eliminar los datos:', error);
    }
  }
  return (
    <>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}

export default DeleteButton;
