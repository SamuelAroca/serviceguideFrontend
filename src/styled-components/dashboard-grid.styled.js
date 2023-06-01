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
    background-color: gray;
  }
  .nav {
    height: 100%;
    width: 100%;
    grid-area: 1 / 3 / 2 / 13;
    background-color: gray;
  }
  .content {
    height: 100%;
    width: 100%;
    grid-area: 2 / 3 / 13 / 13;
  }

  a {
    text-decoration: none;
  }
`;
