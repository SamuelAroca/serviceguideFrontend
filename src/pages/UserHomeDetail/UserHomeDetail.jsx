import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { UserHomeLayout } from "./styled-components/user-home-layout.styled";
import { getToken } from "../../AxiosHelper";
import ChartDoughnut from "./components/ChartDoughnut";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";
import Totals from "./components/Totals";
import axios from "axios";
import Modal from "./components/Modal";
import UpdateHouse from "./components/UpdateHouse";
import { getUserHouses } from "../../services/get-user-houses.service";
import { Button } from "@mui/material";


const UserHomeDetail = () => {
  const apiUrl = import.meta.env.VITE_API_STATISTIC;
  const apiHouse = import.meta.env.VITE_API_HOUSE;
  const [percentages, setPercentages] = useState(null);
  const [sum, setSum] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const onCloseShare = () => {
    setOpenModal(false);
  };

  const { setHouses } = useContext(MyContext);

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
        let idHouse = house.id;
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

  const deleteHome = async() => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar la casa?",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Eliminar casa",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`${apiHouse}/delete/${house.id}`);
          getUserHouses(setHouses);
          navigate("/private/major/home");
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  }

  useEffect(() => {
    getStatistic();
  }, [house]);

  return (
    <UserHomeLayout>
      <div className="house_title">
        <div className="house_information">
          <h2>Información de la casa</h2>
          <p>{house?.name}</p>
          <p>Cantidad Facturas: {house?.receipts?.length}</p>
        </div>
        <div className="actions">
          <Button
            sx={{ color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={() => setOpenModal(true)}
          >
            Editar
          </Button>
          <Button
            onClick={deleteHome}
            sx={{ color: "white", borderColor: "white" }}
            variant="outlined"
          >
            Eliminar
          </Button>
        </div>
      </div>

      <div className="line_chart_container section">
        <LineChart data={receipts} />
      </div>

      <div className="totals container_charts">
        <Totals percentages={percentages} />
      </div>

      <div className="donut section">
        {percentages?.percentage &&
          typeof percentages.percentage === "number" &&
          sum && (
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

      <Modal isOpen={openModal} onClose={onCloseShare}>
        <UpdateHouse data={house} onClose={onCloseShare} />
      </Modal>
    </UserHomeLayout>
  );
};

export default UserHomeDetail;
