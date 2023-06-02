import styles from "../styles/Footer.module.css";;
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs"
import { Link } from "react-router-dom";

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
          <a className={styles.a} href="https://www.facebook.com/profile.php?id=100092335245939&is_tour_completed=true" target="_blank"><BsFacebook /></a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="https://twitter.com/ServiceGuide_" target="_blank"><BsTwitter /></a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="https://www.linkedin.com/in/service-guide-255575275/" target="_blank"><BsLinkedin /></a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="https://www.instagram.com/serviceguide_/" target="_blank"><BsInstagram /></a>
        </li>
      </ul>
      <ul className={styles.menu}>
        <li className={styles.li}><a className={styles.a} href="#home">Home</a></li>
        <li className={styles.li}><a className={styles.a} href="#aboutUs">About</a></li>
        <li className={styles.li}><a className={styles.a} href="#team">Team</a></li>
        <li className={styles.li}><Link className={styles.a} to={"/register"}>Register</Link></li>
        <li className={styles.li}><Link className={styles.a} to={"/login"}>Login</Link></li>
      </ul>
      <p className={styles.p}>©2023 ServiceGuide | All Rights Reserved</p>
      <div className={styles.line} />
    </div>
  );
};

export default Footer;
