import React, { useEffect, useState } from "react";
import styles from "../Styles/StatisticHome.module.css";
import { Bar } from "react-chartjs-2";
import "../../../chartSetup";
import httpClient from "../../../api/httpClient";

const StatisticsHome = ({ idReceipt, typeReceipt }) => {
  const apiUrl = import.meta.env.VITE_API_STATISTIC;
  const [label, setLabel] = useState([]);
  const [price, setPrice] = useState([]);
  const [amount, setAmount] = useState([]);
  const [type, setType] = useState("");

  const getData = async () => {
    if (!idReceipt?.id || !typeReceipt?.typeService) return;
    try {
      const data = await httpClient.get(
        `${apiUrl}/individualReceipt/BAR/${typeReceipt.typeService}/${idReceipt.id}`
      );
      setLabel(data.data.label);
      setPrice(data.data.price);
      setAmount(data.data.amount);
      setType(typeReceipt.typeService);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [idReceipt]);

  const miData = {
    labels: label,
    datasets: [
      {
        label: "Precio del Consumo en Pesos Colombianos",
        data: price,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(99, 226, 255)",
        backgroundColor: "rgba(99, 133, 255, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
        barThickness: 30,
      },
    ],
  };

  const myAmount = {
    labels: label,
    datasets: [
      {
        label: `Consumo de ${type}`,
        data: amount,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(255, 242, 99)",
        backgroundColor: "rgba(99, 255, 107, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
        barThickness: 30,
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
    <div className={styles.charts_container}>
      <div className={styles.div_main}>
        <Bar data={miData} options={misoptions} />
      </div>
      <div className={styles.div_main}>
        <Bar data={myAmount} options={misoptions} />
      </div>
    </div>
  );
};

export default StatisticsHome;
