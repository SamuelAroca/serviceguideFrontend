import styles from "../styles/Footer.module.css";
import { RiWaterFlashFill } from "react-icons/ri";

const Footer = () => {

  return(
    <>
      <div className={styles.main}>
        <div className={styles.container_footer}>
          <div className={styles.container_logo}>
            <RiWaterFlashFill className={styles.logo} />
            <h5>ServiceGuide</h5>
          </div>
          <div className={styles.links}>
            <a href="">LinkedIn</a>
            <a href="">GitHub</a>
            <a href="">Twitter</a>
            <a href="">Instagram</a>
            <a href="">Facebook</a>
            <a href="">Youtube</a>
          </div>
        </div>
        <div className={styles.linea} />
        
      </div>
    </>
  )
};

export default Footer;