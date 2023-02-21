import React from "react";
import '../styled-sheets/Slideshow.css';
import img1 from '../assets/agua-potable.jpg';
import img2 from '../assets/alcantarillado.jpg';
import img3 from '../assets/Electricistas-scaled.jpg';
import img4 from '../assets/gas natural.jpeg';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import styled from "styled-components";

const Slideshow = () => {
  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow>
        <Slide>
          <img src={img1} alt="Agua" />
          <TextoSlide colorFondo="navy" colorTexto="#fff">
            <p>Agua Potable</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <img src={img2} alt="Alcantarillado" />
          <TextoSlide>
            <p>Agua</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <img src={img3} alt="Electricidad" />
          <TextoSlide>
            <p>Agua</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <img src={img4} alt="Gas Natural" />
          <TextoSlide>
            <p>Agua Potable</p>
          </TextoSlide>
        </Slide>
      </ContenedorSlideshow>
      <Controles>
        <Boton>
          <IoChevronBackSharp />
        </Boton>
        <Boton derecho>
          <IoChevronForwardSharp />
        </Boton>
      </Controles>
    </ContenedorPrincipal>
  );
}

const ContenedorPrincipal = styled.div`
  position: relative;
`;

const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: .3s ease all;
  z-index: 9;
  max-height: 500px;
  position: relative;

  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextoSlide = styled.div`
  background: ${props => props.colorFondo ? props.colorFondo : 'rgba(0,0,0,.3)'};
  color: ${props => props.colorTexto ? props.colorTexto : '#fff'};
  width: 100%;
  padding: 2px 50px;
  text-align: center;
  position: absolute;
  bottom: 0;

  p {
    padding-top: 0.6rem;
  }

  @media screen and (max-width: 700px) {
    position: relative;
    background: #000;
  }
`;

const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
`;

const Boton = styled.button`
  pointer-events: all;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 2rem;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: .3s ease all;
  &:hover {
    /* background: rgba(0,0,0,.2); */
    color: white;
  }

  ${props => props.derecho ? 'right: 0' : 'left: 0'}
`;

export default Slideshow;