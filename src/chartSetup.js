import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Registro único de Chart.js, importado por cada componente que dibuja un
// gráfico (Bar, Line, Doughnut). Antes solo StatisticsHome.jsx lo hacía;
// funcionaba "de rebote" porque todo el bundle era uno solo, así que ese
// registro terminaba aplicando a toda la app. Al dividir el código en
// chunks por ruta, entrar directo a una página con un LineChart/Doughnut
// (sin haber pasado antes por la que sí registraba) rompía el gráfico con
// "X is not a registered scale/element". Import (side-effect) este módulo
// en cada componente que use un gráfico, no solo en uno.
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
