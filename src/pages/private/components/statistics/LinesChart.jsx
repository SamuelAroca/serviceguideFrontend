import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
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

const beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const midata = {
  labels: meses,
  datasets: [
    // Cada una de las líneas del gráfcio
    {
      label: "Beneficios",
      data: beneficios,
      tension: 0.5,
      fill: true,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(255, 99, 132)",
      pointBackgroundColor: "rgba(255, 99, 132)",
    },
  ],
};

const misoptions = {
  scales : {
    y : {
      min : -40
    },
    x : {
      ticks : { color: "black" }
    }
  },
  plugins: {
    legend: {
      display : true
    }
  }
}

const LinesChart = () => {
  return (
    <>
      <h2>GRAFICS</h2>
      <div style={{border: "1rem", borderBlockColor: "black"}}>
        <Line data={midata} options={misoptions} />
        <Bar data={midata} options={misoptions} />
        <Pie data={midata} options={misoptions} />
      </div>
    </>
  );
};

export default LinesChart;
