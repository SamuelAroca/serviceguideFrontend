import React from "react";
import { Doughnut } from "react-chartjs-2";
import { UserHomeLayout } from "../styled-components/user-home-layout.styled";

const ChartDoughnut = () => {
  const data = {
    labels: ["Agua", "Energía", "Gas", "Alcantarillado"],
    datasets: [
      {
        data: [10, 20, 15, 5],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  const options = {
    cutoutPercentage: 60,
  };

  return <Doughnut data={data} options={options} />;
};

export default ChartDoughnut;
