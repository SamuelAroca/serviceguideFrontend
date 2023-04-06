import React from "react";
import styles from "../styles/Information.module.css";
import { VscQuote } from "react-icons/vsc";

const Information = () =>{

  return(
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
                "Personal and team growth is essential to achieve goals and objectives in life.
                By working together, we can continually learn and improve. By investing in our growth,
                we can increase our capacity for leadership, collaboration and problem solving,
                allowing us to face challenges with confidence and reach our full potential."
              </p>
              <p className={styles.name_us}>Jim Díaz y Samuel Aroca</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Information;