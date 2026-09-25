import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "../chartSetup";

const DEFAULT_COLORS = ["#606470", "#764f51", "#F7C52D", "#0369a1"];

// Antes esto vivia duplicado en Home/components/LineChart.jsx y
// UserHomeDetail/components/LineChart.jsx, casi identicos salvo colores y
// grid. La version de Home ademas tenia un bug: armaba los precios con
// Object.values(monthlyData).reverse(), asumiendo que el orden de insercion
// del objeto coincidia con el orden cronologico inverso de las etiquetas
// (que se ordenan aparte); si los recibos no llegaban perfectamente
// ordenados por fecha, el precio quedaba bajo el mes equivocado. Aqui los
// precios se leen directo de las etiquetas ya ordenadas, sin ese supuesto.
const ReceiptLineChart = ({ data, colors = DEFAULT_COLORS, showGrid = false }) => {
  const chartRef = useRef(null);

  const types = Array.from(new Set(data?.map((item) => item.typeService)));

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

  const labels = Object.keys(monthlyData).sort(
    (a, b) => moment(a, "MMM YYYY").toDate() - moment(b, "MMM YYYY").toDate()
  );

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

  const chartData = { labels, datasets };

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

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: showGrid },
        drawBorder: false,
        drawOnChartArea: showGrid,
      },
      y: {
        grid: { display: showGrid },
        drawBorder: false,
        drawOnChartArea: showGrid,
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

export default ReceiptLineChart;
