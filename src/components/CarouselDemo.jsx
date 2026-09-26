import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "../styled-sheets/Carousel.module.css";

const CarouselDemo = ({ img1, img2, img3, img4 }) => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      showStatus={false}
      showIndicators={false}
      infiniteLoop={true}
      className={styles.carousel}
    >
      <div className={styles.container_slide}>
        <img src={img1} alt="Agua potable" />
      </div>
      <div className={styles.container_slide}>
        <img src={img2} alt="Alcantarillado" loading="lazy" />
      </div>
      <div className={styles.container_slide}>
        <img src={img3} alt="Electricistas" loading="lazy" />
      </div>
      <div className={styles.container_slide}>
        <img src={img4} alt="Gas natural" loading="lazy" />
      </div>
    </Carousel>
  );
};

export default CarouselDemo;
