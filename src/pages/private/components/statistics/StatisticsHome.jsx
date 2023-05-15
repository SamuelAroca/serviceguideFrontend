import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatisticsHome = () => {
  const apiUrl = "http://localhost:8080";
  const [label, setLabel] = useState([]);
  const [price, setPrice] = useState([]);
  const [amount, setAmount] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      `${apiUrl}/api/statistic/individualReceipt/BAR/ENERGY/47`
    );
    setLabel(data.data.label);
    setPrice(data.data.price);
    setAmount(data.data.amount);
    console.log(label);
  };

  useEffect(() => {
    getData();
  }, []);

  /* const agua = [16, 21, 25, 20, 21, 21, 20, 21, 11, 17, 18];
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
  ]; */

  const miData = {
    labels: label,
    datasets: [
      {
        label: "Precio Consumido",
        data: price,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(99, 226, 255)",
        backgroundColor: "rgba(99, 133, 255, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Consumo",
        data: amount,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(255, 242, 99)",
        backgroundColor: "rgba(99, 255, 107, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
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

  return (
    <>
      <h2>GRAFICS</h2>
      <div style={{ border: "1rem", borderBlockColor: "black" }}>
        <Bar data={miData} options={misoptions} />
      </div>
    </>
  );
};

export default StatisticsHome;
