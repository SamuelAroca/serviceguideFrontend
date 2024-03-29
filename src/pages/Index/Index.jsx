import styles from "./styles/Index.module.css";
import AboutUs from "./components/AboutUs";
import NavbarComp from "../../components/NavbarComp";
import Footer from "./components/Footer";
import Information from "./components/Information";
import VideoPlayer from "./components/VideoPlayer";

const Index = () => {
  return (
    <div className={styles.main_container}>
      <NavbarComp />
      <section className={styles.header_section} id="home">
        <header className={styles.header}>
          <div className={styles.container_title}>
            <h1 className={styles.h1}>
              Gestión del consumo de <br /> servicios públicos.
            </h1>
            <h2 className={styles.subtitle_header}>
              Producción y consumo responsable
            </h2>
          </div>
        </header>
      </section>
      <section className={styles.video_player}>
        <VideoPlayer />
      </section>
      <div className={styles.container_AboutUs}>
        <section id="aboutUs">
          <AboutUs />
        </section>
        <section id="team">
          <Information />
        </section>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
