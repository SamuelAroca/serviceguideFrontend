import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const agua = [16, 21, 25, 20, 21, 21, 20, 21, 11, 17, 18];
const energia = [183, 214, 195, 182, 187, 175, 173, 199, 144, 196, 201];
const alcantarillado = [16, 21, 25, 20, 21, 21, 20, 21, 11, 17, 18];
const gas = [29, 30, 31, 31, 32, 31, 29, 31, 9, 18, 20];
const meses = [
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
];

const miData = {
  labels: meses,
  datasets: [
    {
      label: "Water en m3",
      data: agua,
      tension: 0.5,
      fill: false,
      borderColor: "rgb(99, 226, 255)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(255, 99, 132)",
      pointBackgroundColor: "rgba(255, 99, 132)",
    },
    {
      label: "Energia en kwh",
      data: energia,
      tension: 0.5,
      fill: false,
      borderColor: "rgb(255, 242, 99)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(255, 99, 132)",
      pointBackgroundColor: "rgba(255, 99, 132)",
    },
    {
      label: "Alcantarillado en m3",
      data: alcantarillado,
      tension: 0.5,
      fill: false,
      borderColor: "rgb(99, 226, 255)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(109, 99, 255)",
      pointBackgroundColor: "rgba(109, 99, 255)",
    },
    {
      label: "Gas en m3",
      data: gas,
      tension: 0.5,
      fill: false,
      borderColor: "rgb(99, 255, 107)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(109, 99, 255)",
      pointBackgroundColor: "rgba(109, 99, 255)",
    },
  ],
};

const misoptions = {
  scales: {
    y: {
      min: 0,
    },
    x: {
      ticks: { color: "black" },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

const StatisticsHome = () => {
  return (
    <>
      <h2>GRAFICS</h2>
      <div style={{ border: "1rem", borderBlockColor: "black" }}>
        <Line data={miData} options={misoptions} />
      </div>
    </>
  );
};

export default StatisticsHome;
