import { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@mui/material";
import "../../../chartSetup";

const ChartDoughnut = ({ datos, percentages, value }) => {
  const [changeChart, setChangeChart] = useState(false);
  const chartRef = useRef(null);

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

  useEffect(() => {
    // react-chartjs-2 v5 pone la instancia de Chart.js directamente en el
    // ref (metodo resize() incluido), no en ref.current.chartInstance
    // (esa era la API de v2). El contenedor a observar tampoco es
    // ref.current.container (no existe); es el padre del <canvas>.
    const resizeObserver = new ResizeObserver(() => {
      chartRef.current?.resize();
    });

    const container = chartRef.current?.canvas?.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="donut_component_container">
      {changeChart === false ? (
        <>
          <h3>Cantidad consumida por servicio</h3>
          <div className="charts_donut_container">
            <Doughnut data={data} ref={chartRef} />
          </div>
        </>
      ) : (
        <>
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
              percentage < 0
                ? buildStyles({
                    pathColor: "red",
                    textColor: "red",
                  })
                : buildStyles({
                    pathColor: "green",
                    textColor: "green",
                  })
            }
          />
          <h3>
            Has gastado un{" "}
            {percentage < 0 ? (
              <span style={{ color: "red" }}>{value}% más</span>
            ) : (
              <span style={{ color: "green" }}>{value}% menos</span>
            )}
          </h3>
        </>
      )}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Button variant="outlined" onClick={() => setChangeChart(!changeChart)}>
          ANTERIOR
        </Button>
        <Button variant="outlined" onClick={() => setChangeChart(!changeChart)}>
          SIGUIENTE
        </Button>
      </div>
    </div>
  );
};

export default ChartDoughnut;
