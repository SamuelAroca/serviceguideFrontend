import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const LineChart = ({ data }) => {
  // Obtener los tipos de factura únicos
  const types = Array.from(new Set(data?.map((item) => item.typeService.type)));

  // Colores de las líneas
  const colors = ["#F79F39", "#0ea5e9", "#F7C52D", "#0369a1"];

  // Agrupar los datos por mes
  const monthlyData = {};
  data?.forEach((item) => {
    const month = moment(item.date).format("MMM YYYY");
    if (!monthlyData[month]) {
      monthlyData[month] = {};
    }
    if (!monthlyData[month][item.typeService.type]) {
      monthlyData[month][item.typeService.type] = 0;
    }
    monthlyData[month][item.typeService.type] += item.price;
  });

  // Crear un objeto de datasets para cada tipo de factura
  const datasets = types?.map((type, index) => {
    const prices = Object.values(monthlyData).map((monthData) => monthData[type] || 0);
    return {
      label: type,
      data: prices,
      fill: false,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      lineTension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
    };
  });

  // Crear las etiquetas de mes
  const labels = Object.keys(monthlyData);

  // Crear el objeto de configuración para el gráfico
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  //Estilos del gráfico
  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
