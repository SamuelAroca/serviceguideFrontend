import styled from "styled-components";
import { GrayPaleteColors } from "../palete-colors/gray-colors.palete";

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
    background-color: ${GrayPaleteColors.C50};
  }

  a {
    text-decoration: none;
  }
`;
