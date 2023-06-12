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
          Te ayudamos a gestionar tus <br /> servicios públicos
        </h2>
      </div>
      <h2 className={styles.subtitle}>Nuestro objetivo</h2>
      <div className={styles.container_services}>
        <div className={styles.p_water}>
          <div className={styles.cont_icon}>
            <IoWaterOutline className={styles.icon} />
          </div>
          <h2>Agua</h2>
          <p>
              El uso global del agua es esencial para la supervivencia humana y la economía en
             desarrollo, pero muchas regiones enfrentan escasez de agua debido a
             el crecimiento demográfico, el cambio climático y la mala gestión del agua.
          </p>
        </div>

        <div className={styles.p_energy}>
          <div className={styles.cont_icon}>
            <SlEnergy className={styles.icon} />
          </div>
          <h2>Energia</h2>
          <p className={styles.p}>
          La energía es esencial para el crecimiento económico y el desarrollo humano,
             pero la mayoría de las fuentes de energía son finitas y contribuyen al cambio climático.
             se necesita un cambio hacia fuentes de energía renovables y sostenibles
             para garantizar un suministro de energía a largo plazo.
          </p>
        </div>

        <div className={styles.p_gas}>
          <div className={styles.cont_icon}>
            <BsCloudy className={styles.icon} />
          </div>
          <h2>Gas</h2>
          <p className={styles.p}>
          El gas natural es una importante fuente de energía utilizada en la industria,
             transporte y calefacción. Sin embargo, el uso de gas también tiene
             impactos ambientales, como la emisión de gases de efecto invernadero. Es necesario un equilibrio entre el uso de gas y
             la protección del medio ambiente.
          </p>
        </div>

        <div className={styles.p_sewerage}>
          <div className={styles.cont_icon}>
            <BiWater className={styles.icon} />
          </div>
          <h2>Alcantarillado</h2>
          <p className={styles.p}>
              El sistema de alcantarillado es fundamental para garantizar la eliminación segura y
             eficaz de los desechos humanos y proteger la salud pública. Sin embargo, muchos países aún carecen de sistemas de alcantarillado adecuados, lo que
             puede provocar la contaminación del agua y la propagación de enfermedades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
