import React from "react";
import Dialog from "@mui/material/Dialog";
import Login from "./Login";
import styles from "../styled-sheets/Modal.module.css";

const Modal = ({ open, setOpen }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          color: "black",
          borderRadius: "0.5rem",
          maxWidth: "1100px",
          height: "550px",
        },
      }}
    >
      <div className={styles.modal_body}>
        <Login setOpen={setOpen} open={open} />
      </div>
    </Dialog>
  );
};

export default Modal;
