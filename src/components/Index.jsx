import styles from "../styled-sheets/Index.module.css";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Register from "./Register";

const Index = () => {
  return (
    <div className={styles.main_container}>
      <section className={styles.header_section} id="home">
        <header className={styles.header}>
          <div className={styles.container_title}>
            <h1>Management of consumption of <br /> public services.</h1>
            <h2 className={styles.subtitle_header}>Responsible production and consumption</h2>
          </div>
        </header>
        <div className={styles.statistics_cont}>
            <div className={styles.sta_1}>

            </div>
            <div className={styles.sta_2}>

            </div>
            <div className={styles.sta_3}>

            </div>
          </div>
      </section>
      <section id="aboutUs">
        <AboutUs />
      </section>
    </div>
  );
};

export default Index;
