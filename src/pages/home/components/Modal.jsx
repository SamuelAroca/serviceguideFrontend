import React from "react";
import Dialog from "@mui/material/Dialog";
import Login from "./Login";
import styles from "../styles/Modal.module.css";

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
          padding: "0",
          margin: "0",
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
