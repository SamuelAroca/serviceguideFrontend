import React from "react";
import styled from "../styles/NotFound.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const NotFound = () => {
  return (
    <div className={styled.div_main}>
      <h3 className={styled.tittle}>404 Not Found</h3>
      <div className={styled.div_button}>
        <Button variant="contained" className={styled.button} href="/">
          Volver
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
