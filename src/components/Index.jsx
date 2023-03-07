import styles from "../styled-sheets/Index.module.css";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Register from "./Register";

const Index = () => {
  return (
    <div className={styles.main_container}>
      <section id="home">
        <header className={styles.header}></header>
      </section>
      <section id="aboutUs">
        <AboutUs />
      </section>
    </div>
  );
};

export default Index;
