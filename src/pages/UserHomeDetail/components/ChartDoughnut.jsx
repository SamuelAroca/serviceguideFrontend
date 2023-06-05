import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@mui/material";

const ChartDoughnut = ({ datos, percentages, value }) => {
  const [changeChart, setChangeChart] = useState(false);

  const data = {
    labels: ["Agua", "Energía", "Gas", "Alcantarillado"],
    datasets: [
      {
        data: datos,
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  const options = {
    cutoutPercentage: 60,
  };

  const percentage = percentages;
  const circle = value;

  return (
    <>
      {changeChart === false ? (
        <div>
          <Doughnut data={data} options={options} />
        </div>
      ) : (
        <div>
          <CircularProgressbar value={value} text={`${percentage}%`} strokeWidth={12} />
        </div>
      )}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button variant="outlined" onClick={() => setChangeChart(!changeChart)}>
          Prev
        </Button>
        <Button variant="outlined" onClick={() => setChangeChart(!changeChart)}>
          Next
        </Button>
      </div>
    </>
  );
};

export default ChartDoughnut;
