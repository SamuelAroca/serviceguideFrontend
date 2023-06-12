import styled from "styled-components";
import { GrayPaleteColors } from "../../../palete-colors/gray-colors.palete";
import { BluePaleteColors } from "../../../palete-colors/blue-colors.palete";

export const UserHomeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  gap: 2rem;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: auto;

  .house_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${GrayPaleteColors.C100};
    box-shadow: 0px 0px 10px 0px ${GrayPaleteColors.C100};
    border-radius: 2rem;
    box-sizing: border-box;
    padding: 1rem;

    color: ${GrayPaleteColors.C100};
    width: 100%;
    height: 100%;
    grid-area: 1 / 1 / 3 / 8;
    background: rgb(190, 18, 60);
    background: linear-gradient(
      to left,
      #0284c7 0%,
      #0ea5e9 33%,
      #38bdf8 100%,
      #7dd3fc 100%
    );

    .house_information {
      display: flex;
      flex-direction: column;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
  }
  .donut {
    display: grid;
    place-items: center;
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    grid-area: 1 / 8 / 7 / 13;

    .donut_component_container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-direction: column;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      .charts_donut_container {
        display: grid;
        place-items: center;
        max-height: 75%;
      }
    }
  }

  .line_chart_container {
    width: 100%;
    height: 100%;
    grid-area: 7 / 8 / 13 / 13;
  }
  .totals {
    width: 100%;
    height: 100%;
    grid-area: 3 / 1 / 5 / 8;
  }
  .data_table {
    width: 100%;
    height: 100%;
    grid-area: 5 / 1 / 13 / 8;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 6px;
      background-color: none;
    }

    &::-webkit-scrollbar-track {
      background-color: none;
      background-color: white;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ddd;
    }
  }

  .container_charts {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    box-sizing: border-box;
    .chart_div {
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      overflow: auto;
      box-sizing: border-box;
      overflow: hidden;
    }
    .chart_div:nth-child(1) {
      background-color: ${BluePaleteColors.C200};
    }
    .chart_div:nth-child(2) {
      background-color: ${BluePaleteColors.C100};
    }
    .chart_div:nth-child(3) {
      background-color: ${BluePaleteColors.C50};
    }
  }

  .section {
    border: 1px solid ${GrayPaleteColors.C100};
    box-shadow: 0px 0px 10px 0px ${GrayPaleteColors.C100};
    background-color: white;
    border-radius: 2rem;
    box-sizing: border-box;
    padding: 1rem;
  }

  h1,
  h3,
  h2,
  p {
    margin: 0;
  }
`;
