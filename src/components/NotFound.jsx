import React from "react";
import { Link } from "react-router-dom";
import styles from "../styled-sheets/NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_sm_12}>
            <div className={styles.col_sm_10}>
              <div className={styles.four_zero_four_bg}>
                <h1 className={styles.text_center}>404</h1>
                <div className={styles.image}></div>
              </div>
              <div className={styles.messagge}>
                <h3 className={styles.h2}>Parece que estás perdido</h3>
                <p>¡La página que buscas no está disponible!</p>
                <Link to="/" className={styles.link_404}>
                  Ir al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
