import SideNav from "../../SideNav";
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
      <SideNav />
      <div style={{border: "1rem", borderBlockColor: "black"}}>
      
      </div>
    </>
  );
};

export default LinesChart;
