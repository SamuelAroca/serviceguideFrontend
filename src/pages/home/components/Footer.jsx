import styles from "../styles/Footer.module.css";
import { Fab } from "@mui/material";
import { RiWaterFlashFill } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs"

const Footer = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.waves}>
        <div className={styles.wave1}></div>
        <div className={styles.wave2}></div>
        <div className={styles.wave3}></div>
        <div className={styles.wave4}></div>
      </div>
      <ul className={styles.social_icon}>
        <li className={styles.li}>
          <a className={styles.a} href=""><BsFacebook /></a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href=""><BsTwitter /></a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href=""><BsLinkedin /></a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href=""><BsInstagram /></a>
        </li>
      </ul>
      <ul className={styles.menu}>
        <li className={styles.li}><a className={styles.a} href="#">Home</a></li>
        <li className={styles.li}><a className={styles.a} href="#">About</a></li>
        <li className={styles.li}><a className={styles.a} href="#">Team</a></li>
        <li className={styles.li}><a className={styles.a} href="#">Services</a></li>
        <li className={styles.li}><a className={styles.a} href="#">Contact</a></li>
      </ul>
      <p className={styles.p}>©2023 ServiceGuide | All Rights Reserved</p>
      <div className={styles.line} />
    </div>
  );
};

export default Footer;
