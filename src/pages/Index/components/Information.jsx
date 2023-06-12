import React from "react";
import styles from "../styles/Information.module.css";
import { VscQuote } from "react-icons/vsc";

const Information = () => {
  return (
    <div>
      <div className={styles.container_info}>
        <div className={styles.us}>
          <h2>
            <span>We are</span> the team
          </h2>
          <div className={styles.flex_container}>
            <div className={styles.container_picture}>
              <div className={styles.picture}></div>
            </div>
            <div className={styles.paragraph_us}>
              <VscQuote className={styles.icon_paragraph} />
              <p className={styles.text_us}>
              "El crecimiento personal y del equipo es fundamental para alcanzar los objetivos
                 en la vida. Al trabajar juntos, podemos continuamente
                 aprender y mejorar. Al invertir en nuestro crecimiento, podemos aumentar
                 nuestra capacidad de liderazgo, colaboración y resolución de problemas,
                 permitiéndonos enfrentar los desafíos con confianza y alcanzar nuestro
                 potencial completo."
              </p>
              <div className={styles.container_us}>
                <p className={styles.name_us}>
                  <a target="blank" href="https://www.linkedin.com/in/jim-diaz-del-castilllo-a91913165/" className={styles.name_us}>Jim Díaz </a>
                   y
                  <a target="blank" href="https://www.linkedin.com/in/samuel-aroca-266421249/" className={styles.name_us}> Samuel Aroca</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
