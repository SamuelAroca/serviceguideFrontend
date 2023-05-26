import React from "react";
import styles from "../styles/AboutUs.module.css";
import { IoWaterOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { BsCloudy } from "react-icons/bs";
import { BiWater } from "react-icons/bi";

const AboutUs = () => {
  return (
    <div className={styles.main}>
      <div className={styles.subtitle_abs}>
        <h2 className={styles.h2}>
          We help you manage your <br /> public services
        </h2>
      </div>
      <h2 className={styles.subtitle}>Our Focus</h2>
      <div className={styles.container_services}>
        <div className={styles.p_water}>
          <div className={styles.cont_icon}>
            <IoWaterOutline className={styles.icon} />
          </div>
          <h2>Water</h2>
          <p>
            The global use of water is essential for human survival and economic
            development, but many regions face shortages of water due to
            population growth, climate change and the poor management of water
            resources.
          </p>
        </div>

        <div className={styles.p_energy}>
          <div className={styles.cont_icon}>
            <SlEnergy className={styles.icon} />
          </div>
          <h2>Energy</h2>
          <p className={styles.p}>
            Energy is essential for economic growth and the human development,
            but most energy sources are finite and contribute to climate change.
            a change is needed towards renewable and sustainable energy sources
            to guarantee a long-term power supply.
          </p>
        </div>

        <div className={styles.p_gas}>
          <div className={styles.cont_icon}>
            <BsCloudy className={styles.icon} />
          </div>
          <h2>Gas</h2>
          <p className={styles.p}>
            Natural gas is an important source of energy used in industry,
            transport and heating. However, the use of gas also has
            environmental impacts, such as the emission of gases greenhouse
            effect. A balance is necessary between the use of gas and
            environmental protection.
          </p>
        </div>

        <div className={styles.p_sewerage}>
          <div className={styles.cont_icon}>
            <BiWater className={styles.icon} />
          </div>
          <h2>Sewerage</h2>
          <p className={styles.p}>
            The sewer system is crucial to ensure the safe disposal and
            effective disposal of human waste and protect public health. Without
            However, many countries still lack sewage systems adequate, which
            can lead to contamination of water and disease spread.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
