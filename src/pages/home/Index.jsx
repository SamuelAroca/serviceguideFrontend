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
            <h1>
              Management of consumption of <br /> public services.
            </h1>
            <h2 className={styles.subtitle_header}>
              Responsible production and consumption
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
