import SideNav from "./SideNav";
import LinesChart from "./components/statistics/LinesChart";

const Statistics = () => {
  return (
    <>
      <SideNav />
      <h1>ESTAS SON LAS ESTADISTICAS</h1>
      
      <div style={{marginLeft: "30rem", height: "50rem", width: "50rem"}}>
        <h2>GRÁFICAS</h2>
        <LinesChart />
      </div>
    </>
  );
};

export default Statistics;
