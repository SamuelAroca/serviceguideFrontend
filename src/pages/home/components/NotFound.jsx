import React from "react";
import styled from "../styles/NotFound.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const NotFound = () => {
  return (
    <section className={styled.page_404}>
      <div className={styled.container}>
        <div className={styled.row}>
        <div className={styled.col_sm_12}>
        <div className={styled.col_sm_10}>
        <div className={styled.four_zero_four_bg}>
          <h1 className={styled.text_center}>404</h1>
          <div className={styled.image}>
            
          </div>
        </div>
        <div className={styled.h3}>
          <h3 className={styled.h2}>
            Look Like you're lost
          </h3>
          <p>
            the page you are looking for not available!
          </p>
          <a href="" className={styled.link_404}>Go to Home</a>
        </div>
          </div>
          </div>
          </div>
      </div>
    </section>
  );
};

export default NotFound;
