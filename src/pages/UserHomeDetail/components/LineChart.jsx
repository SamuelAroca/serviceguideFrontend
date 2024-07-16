import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  // Obtener los tipos de factura únicos
  const types = Array.from(new Set(data?.map((item) => item.typeService)));

  // Colores de las líneas
  const colors = ["#F79F39", "#0ea5e9", "#F7C52D", "#0369a1"];

  // Agrupar los datos por mes
  const monthlyData = {};
  data?.forEach((item) => {
    const month = moment(item.date).format("MMM YYYY");
    if (!monthlyData[month]) {
      monthlyData[month] = {};
    }
    if (!monthlyData[month][item.typeService]) {
      monthlyData[month][item.typeService] = 0;
    }
    monthlyData[month][item.typeService] += item.price;
  });

  // Crear las etiquetas de mes ordenadas
  const labels = Object.keys(monthlyData).sort(
    (a, b) => moment(a, "MMM YYYY").toDate() - moment(b, "MMM YYYY").toDate()
  );

  // Crear un objeto de datasets para cada tipo de factura con los datos ordenados
  const datasets = types?.map((type, index) => {
    const prices = labels.map((label) => monthlyData[label]?.[type] || 0);
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

  // Crear el objeto de configuración para el gráfico
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    });

    if (chartRef.current && chartRef.current.container) {
      resizeObserver.observe(chartRef.current.container);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Estilos del gráfico
  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
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

  return <Line ref={chartRef} data={chartData} options={chartOptions} />;
};

export default LineChart;
