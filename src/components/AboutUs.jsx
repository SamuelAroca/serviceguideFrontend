import React from 'react'
import styles from '../styled-sheets/AboutUs.module.css';
import { IoWaterOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { BsCloudy } from "react-icons/bs";
import { BiWater } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AboutUs = () => {
  return (
    <div className={styles.main}>
      <div className={styles.subtitle_abs}>
        <h2>We help you manage your <br /> public services</h2>
      </div>
      <h2 className={styles.subtitle}>Our Focus</h2>
      <div className={styles.container_services}>
        <div className={styles.p_water}>
          <div className={styles.cont_icon}>
            <IoWaterOutline className={styles.icon} />
          </div>
          <h2>Water</h2>
          <p>
          El uso mundial del agua es esencial para la supervivencia humana y el desarrollo económico, 
          pero muchas regiones enfrentan escasez de agua debido al crecimiento de la población, 
          el cambio climático y la mala gestión de los recursos hídricos.
          </p>
        </div>

        <div className={styles.p_energy}>
          <div className={styles.cont_icon}>
            <SlEnergy className={styles.icon} />
          </div>
          <h2>Energy</h2>
          <p>
          La energía es fundamental para el crecimiento económico y el desarrollo humano, 
          pero la mayoría de las fuentes de energía son finitas y contribuyen al cambio climático. 
          Es necesario un cambio hacia fuentes de energía renovable y sostenible para garantizar un suministro de energía a largo plazo.
          </p>
        </div>

        <div className={styles.p_gas}>
          <div className={styles.cont_icon}>
            <BsCloudy className={styles.icon} />
          </div>
          <h2>Gas</h2>
          <p>
          El gas natural es una fuente importante de energía que se utiliza en la industria, 
          el transporte y la calefacción. Sin embargo, el uso del gas también tiene impactos ambientales, 
          como la emisión de gases de efecto invernadero. Es necesario un equilibrio entre el uso del gas y la protección del medio ambiente.
          </p>
        </div>

        <div className={styles.p_sewerage}>
          <div className={styles.cont_icon}>
            <BiWater className={styles.icon} />
          </div>
          <h2>Sewerage</h2>
          <p>
          El alcantarillado es crucial para garantizar la eliminación segura y efectiva de los desechos humanos y proteger la salud pública. 
          Sin embargo, muchos países aún carecen de sistemas de alcantarillado adecuados, 
          lo que puede llevar a la contaminación del agua y la propagación de enfermedades. 
          </p>
        </div>
      </div>
      <div className={styles.container_info}>
        <div className={styles.us}>
          <h2><span>We are</span> the team</h2>
          <div className={styles.container_picture}>
            <div className={styles.picture}>
            
            </div>
          </div>
          <div className={styles.paragraph_us}>
            <FontAwesomeIcon icon="fa-solid fa-quote-left" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Est libero dignissimos impedit earum eius aut reiciendis deserunt iste maiores, 
              tempore nobis tempora culpa eos molestias optio modi provident consequuntur id.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cotainer_footer}>

      </div>
    </div>
  )
}

export default AboutUs