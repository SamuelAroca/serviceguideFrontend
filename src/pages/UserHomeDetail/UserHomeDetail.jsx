import { useParams } from "react-router-dom";
import { MyContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { UserHomeLayout } from "./styled-components/user-home-layout.styled";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import ChartDoughnut from "./components/ChartDoughnut";
import CarouselComponent from "./components/CarouselComponent";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";
import Totals from "./components/Totals";
import axios from "axios";

const UserHomeDetail = () => {
  const apiUrl = import.meta.env.VITE_API_STATISTIC;
  const [percentages, setPercentages] = useState(null);

  const { id } = useParams();
  console.log(id, "ID");
  const { houses } = useContext(MyContext);

  const [house, setHouse] = useState(null);
  const [receipts, setReceipts] = useState(null);

  const LAST_MONT_RECEIPTS = receipts?.filter((receipt) => {
    const date = new Date(receipt.date);
    const month = date.getMonth() + 1;
    return month === 10;
  });

  const getTotals = async () => {
    let accessToken = getToken();
    const response = await axios.get(
      `${apiUrl}/getPercentage/${house?.name}/${accessToken}`
    );
    const data = response.data;
    setPercentages(data);
  };

  useEffect(() => {
    setHouse(houses?.find((house) => Number(house.id) === Number(id)));
    setReceipts(house?.receipts);
    getTotals();
  }, [id, house, houses]);

  return (
    <UserHomeLayout>
      <div className="house_title">
        <h1>Información de la casa</h1>
        <div>
          <h3>{house?.name}</h3>
          <p>Cantidad Facturas: {house?.receipts?.length}</p>
        </div>
      </div>

      <div className="line_chart_container section">
        <LineChart data={receipts} />
      </div>

      <div className="totals container_charts">
        <Totals percentages={percentages} />
      </div>

      <div className="donut section">
        <ChartDoughnut />
        {/* <CarouselComponent /> */}
      </div>

      <div className="data_table section">
        <DataTable data={receipts} />
      </div>
    </UserHomeLayout>
  );
};

export default UserHomeDetail;
