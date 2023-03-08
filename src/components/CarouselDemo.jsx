import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from '../styled-sheets/Carousel.module.css';
import img3 from "../assets/Electricistas-scaled.jpg";
import img4 from "../assets/gas natural.jpeg";

const CarouselDemo = ({img1, img2}) => {
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
                    <img src={img1} alt="" />
                </div>
                <div className={styles.container_slide}>
                    <img src={img2} />
                </div>
                <div className={styles.container_slide}>
                    <img src={img3} />
                </div>
                <div className={styles.container_slide}>
                    <img src={img4} />
                </div>
            </Carousel>
        );
}

export default CarouselDemo;
