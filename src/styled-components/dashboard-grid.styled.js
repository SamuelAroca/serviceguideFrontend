import styled from "styled-components";

export const DashboardGrid = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  .sidenav {
    height: 100%;
    width: 100%;
    grid-area: 1 / 1 / 13 / 3;
  }

  .content {
    height: 100%;
    width: 100%;
    grid-area: 1 / 3 / 13 / 13;
    background-color: var(--bg-color);
    color: var(--text-color);
    /* Sin esto, cuando el contenido de una pagina (ej. Home con varias
       casas) crece mas alla de 100vh, .content lo desborda visualmente
       en vez de recortarlo/scrollearlo -- y como nada mas en la cadena
       tiene overflow, termina siendo el <body> el que hace scroll de
       toda la pagina, arrastrando al sidebar con el (el sidebar deja de
       verse "fijo"). Ademas ese desborde queda pintado con el fondo por
       defecto del body (blanco) en vez de --bg-color, porque cae fuera
       de esta caja. overflow-y:auto hace que SOLO esta columna scrollee,
       dejando el sidenav quieto.  */
    overflow-y: auto;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    .sidenav {
      width: auto;
      height: auto;
      grid-area: auto;
    }

    .content {
      grid-area: auto;
      grid-column: 1 / -1;
      padding-top: 4.5rem;
      box-sizing: border-box;
    }
  }
`;
