import { useParams } from "react-router-dom";
import { MyContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { UserHomeLayout } from "./styled-components/user-home-layout.styled";
import { getToken } from "../../AxiosHelper";
import ChartDoughnut from "./components/ChartDoughnut";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";
import Totals from "./components/Totals";
import axios from "axios";

const UserHomeDetail = () => {
  const apiUrl = import.meta.env.VITE_API_STATISTIC;
  const [percentages, setPercentages] = useState(null);
  const [sum, setSum] = useState([]);

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

  useEffect(() => {
    setHouse(houses?.find((house) => Number(house.id) === Number(id)));
    setReceipts(house?.receipts);
  }, [id, house, houses]);

  const getStatistic = () => {
    if (house) {
      const getTotals = async () => {
        let idHouse = house.id
        const response = await axios.get(
          `${apiUrl}/informationReceipt/${idHouse}`
        );
        const data = response.data;
        setPercentages(data);
      };
  
      const getSum = async () => {
        try {
          let accessToken = getToken();
          const response = await axios.get(
            `${apiUrl}/sumStatisticByType/${house.name}/${accessToken}`
          );
          const data = response.data;
          setSum([]);
          setSum(data);
        } catch (error) {
          console.log(error.message);
        }
      };
      getTotals();
      getSum();
    }
  };

  useEffect(() => {
    getStatistic();
  }, [house]);

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
        {percentages?.percentage && typeof percentages.percentage === 'number' && sum && (
          <ChartDoughnut
            value={Math.abs(percentages.percentage).toFixed(1)}
            percentages={percentages.percentage.toFixed(1)}
            datos={sum}
          />
        )}
      </div>

      <div className="data_table section">
        <DataTable data={receipts} />
      </div>
    </UserHomeLayout>
  );
};

export default UserHomeDetail;
