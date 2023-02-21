import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from '../styled-sheets/Carousel.module.css'
import agua_potable from '../assets/agua-potable.jpg'
import alcantarillado from '../assets/alcantarillado.jpg'
import electricistas_scaled from '../assets/electricistas-scaled.jpg'

const CarouselDemo = () => {
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
                    <img src={agua_potable} alt="" />
                </div>
                <div className={styles.container_slide}>
                    <img src={alcantarillado} />
                </div>
                <div className={styles.container_slide}>
                    <img src={electricistas_scaled} />
                </div>
            </Carousel>
        );
}

export default CarouselDemo;
