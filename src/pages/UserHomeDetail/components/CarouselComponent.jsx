import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import ChartDoughnut from './ChartDoughnut';

const CarouselComponent = () => {
  const donutData = [
    { label: 'Agua', data: [30, 70] },
    { label: 'Energía', data: [50, 50] },
    { label: 'Gas', data: [40, 60] },
    { label: 'Alcantarillado', data: [20, 80] },
  ];

  const carouselSettings = {
    showStatus: false,
    showThumbs: false,
    infiniteLoop: true,
    showArrows: false,
    showIndicators: false,
    swipeable: true,
    emulateTouch: true,
    selectedItem: 0,
    renderArrowPrev: () => null,
    renderArrowNext: () => null,
    renderIndicator: () => null,
    renderThumbs: () => null,
  };

  const ChartDoughnutComponent = ({ data }) => (
    <div>
      <ChartDoughnut data={data} />
    </div>
  );

  return (
    <Carousel {...carouselSettings}>
      {donutData.map((data, index) => (
        <ChartDoughnut key={index} data={data} />
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
