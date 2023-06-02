import { useParams } from "react-router-dom";
import { MyContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { UserHomeLayout } from "./styled-components/user-home-layout.styled";
import ChartDoughnut from "./components/ChartDoughnut";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";
import Totals from "./components/Totals";

const UserHomeDetail = () => {
  const { id } = useParams();
  const { houses } = useContext(MyContext);

  const [house, setHouse] = useState(null);
  const [receipts, setReceipts] = useState(null);

  const LAST_MONT_RECEIPTS = receipts?.filter((receipt) => {
    const date = new Date(receipt.date);
    const month = date.getMonth() + 1;
    return month === 10;
  });

  console.log(LAST_MONT_RECEIPTS, "ultimo_mes");

  console.log(house);

  useEffect(() => {
    setHouse(houses?.find((house) => Number(house.id) === Number(id)));
    setReceipts(house?.receipts);
  }, [id, houses]);

  return (
    <UserHomeLayout>
      <div>
        <h1>Información de la casa</h1>
        <div>
          <h3>{house?.name}</h3>
          <p>Cantidad Facturas: {house?.receipts?.length}</p>
        </div>
      </div>
      <div className="content">
        <div className="left_section">
          <div className="container_charts">
            <Totals />
          </div>

          <div className="line_chart_container section">
            <LineChart data={receipts} />
          </div>
        </div>

        <div>
          <div className="chart_div section">
            <div className="chart_div">
              <ChartDoughnut />
            </div>
          </div>
          <div className="table section">
            <DataTable data={receipts} />
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
};

export default UserHomeDetail;
