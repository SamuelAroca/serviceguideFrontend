import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  CircularProgressbar,
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

  const percentage = percentages;

  return (
    <>
      {changeChart === false ? (
        <div>
          <h3>Cantidad consumida por servicio</h3>
          <div /* style={{ width: "250px", height: "250px" }} */>
            <Doughnut data={data} />
          </div>
        </div>
      ) : (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px"}}>
          <h3>
            Tu progreso ha sido{" "}
            {percentage < 0 ? (
              <span style={{ color: "red" }}>negativo</span>
            ) : (
              <span style={{ color: "green" }}>positivo</span>
            )}
          </h3>
          <CircularProgressbar 
            value={value} 
            text={`${percentage}%`} 
            strokeWidth={10} 
            styles={
              percentage < 0 ? buildStyles({
              pathColor: "red",
              textColor: "red"
            }): buildStyles({
              pathColor: "green",
              textColor: "green",
            })}
          />
          <h3>
            Has gastado un{" "}
            {percentage < 0 ? (
              <span style={{ color: "red" }}>{value}% más</span>
            ) : (
              <span style={{ color: "green" }}>{value}% menos</span>
            )}
          </h3>
        </div>
      )}
      <div style={{ display: "flex", gap: "1rem"}}>
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
