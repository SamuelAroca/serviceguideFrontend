import styles from "./styles/Index.module.css";
import AboutUs from "./components/AboutUs";
import NavbarComp from "../../components/NavbarComp";
import Footer from "./components/Footer";
import Information from "./components/Information";

const Index = () => {
  return (
    <div className={styles.main_container}>
      <NavbarComp />
      <section className={styles.header_section} id="home">
        <header className={styles.header}>
          <div className={styles.container_title}>
            <h1>
              Management of consumption of <br /> public services.
            </h1>
            <h2 className={styles.subtitle_header}>
              Responsible production and consumption
            </h2>
          </div>
        </header>
        <div className={styles.statistics_cont}>
          <div className={styles.sta_1}></div>
          <div className={styles.sta_2}></div>
          <div className={styles.sta_3}></div>
        </div>
      </section>
      <div className={styles.container_AboutUs}>
        <section id="aboutUs">
          <AboutUs />
        </section>
        <section id="info">
          <Information />
        </section>
      </div>
      <footer>
        <section>
          <Footer />
        </section>
      </footer>
    </div>
  );
};

export default Index;
