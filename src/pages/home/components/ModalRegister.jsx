import React from "react";
import Dialog from "@mui/material/Dialog";
import Register from "./Register";
import styles from "../styles/Modal.module.css";

const ModalRegister = ({ open, setOpen }) => {
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
        <Register setOpen={setOpen} open={open} />
      </div>
    </Dialog>
  );
};

export default ModalRegister;
