import styled from "styled-components";
import { GrayPaleteColors } from "../../../palete-colors/gray-colors.palete";
import { BluePaleteColors } from "../../../palete-colors/blue-colors.palete";

export const UserHomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: auto;

  .content {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 1rem;
    box-sizing: border-box;
  }

  .left_section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .line_chart_container {
    width: 100%;
  }

  .container_charts {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    box-sizing: border-box;
    .chart_div {
      height: 8rem;
      width: 100%;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      overflow: auto;
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

  .donut_chart_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .donut_chart {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table {
    border-radius: 2rem;
    overflow: hidden;
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
  h3 {
    margin: 0;
  }
`;
