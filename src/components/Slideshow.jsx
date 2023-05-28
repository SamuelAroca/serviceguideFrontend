import React, { useRef, useEffect } from "react";
import "../styled-sheets/Slideshow.css";
import img1 from "../assets/agua-potable.webp";
import img2 from "../assets/alcantarillado.webp";
import img3 from "../assets/Electricistas-scaled.webp";
import img4 from "../assets/gas-natural.webp";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import styled from "styled-components";

const Slideshow = () => {
  const slideshow = useRef(null);

  const slideshowInterval = useRef(null);

  const next = () => {
    // Comprueba si el slideshow tiene elementos
    if (slideshow.current.children.length > 0) {
      // Se obtiene el primer elemento
      const firstElement = slideshow.current.children[0];

      slideshow.current.style.transition = `500ms ease-out all`;

      const slideSize = slideshow.current.children[0].offsetWidth;
      // Movemos el slideshow
      slideshow.current.style.transform = `translateX(-${slideSize}px)`;

      const transition = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        slideshow.current.appendChild(firstElement);

        slideshow.current.removeEventListener("transitionend", transition);
      };

      slideshow.current.addEventListener("transitionend", transition);
    }
  };

  const former = () => {
    console.log("former");
    if (slideshow.current.children.length > 0) {
      const index = slideshow.current.children.length - 1;
      const lastElement = slideshow.current.children[index];
      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);

      slideshow.current.style.transition = "none";

      const slideSize = slideshow.current.children[0].offsetWidth;

      slideshow.current.style.transform = `translate(-${slideSize}px)`;
      console.log("antes timeout");

      setTimeout(() => {
        console.log("timeout");
        slideshow.current.style.transition = "500ms ease-out all";
        slideshow.current.style.transform = `translateX(0)`;
      }, 50);
    }
  };

  useEffect(() => {
    slideshowInterval.current = setInterval(() => {
      next();
    }, 10000);

    slideshow.current.addEventListener("mouseenter", () => {
      console.log("pause");
      clearInterval(slideshowInterval.current);
    });

    slideshow.current.addEventListener("mouseleave", () => {
      slideshowInterval.current = setInterval(() => {
        next();
      }, 5000);
    });
  }, []);

  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow ref={slideshow}>
        <Slide>
          <img src={img1} alt="Agua" />
          <TextoSlide
            colorFondo="rgba(133, 193, 233, .7)"
            colorTexto="##0B3769"
          >
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
        <Boton onClick={former}>
          <IoChevronBackSharp />
        </Boton>
        <Boton derecho onClick={next}>
          <IoChevronForwardSharp />
        </Boton>
      </Controles>
    </ContenedorPrincipal>
  );
};

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
  transition: 0.3s ease all;
  z-index: 9;
  max-height: 500px;
  position: relative;

  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextoSlide = styled.div`
  background: ${(props) =>
    props.colorFondo ? props.colorFondo : "rgba(0,0,0,.3)"};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff")};
  width: 100%;
  padding: 2px 50px;
  text-align: center;
  position: absolute;
  bottom: 0;
  font-size: 1.3rem;

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
  transition: 0.3s ease all;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: white;
  }

  ${(props) => (props.derecho ? "right: 0" : "left: 0")}
`;

export default Slideshow;
