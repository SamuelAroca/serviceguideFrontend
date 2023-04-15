import styles from "../styles/Footer.module.css";
import { Fab } from "@mui/material";
import { RiWaterFlashFill } from "react-icons/ri";
/* import {AddIcon} from ""
 */
const Footer = () => {
  return (
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
        <div className={styles.redes_icon}>
          <Fab className="Fab_Aroca"></Fab>
        </div>
      </div>
    </>
  );
};

export default Footer;
