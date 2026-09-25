import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { UserHomeLayout } from "./styled-components/user-home-layout.styled";
import ChartDoughnut from "./components/ChartDoughnut";
import DataTable from "./components/DataTable";
import LineChart from "../../components/ReceiptLineChart";

const USER_HOME_DETAIL_CHART_COLORS = ["#F79F39", "#0ea5e9", "#F7C52D", "#0369a1"];
import Totals from "./components/Totals";
import httpClient from "../../api/httpClient";
import Modal from "./components/Modal";
import UpdateHouse from "./components/UpdateHouse";
import { getUserHouses } from "../../services/get-user-houses.service";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const UserHomeDetail = () => {
  const apiUrl = import.meta.env.VITE_API_STATISTIC;
  const apiHouse = import.meta.env.VITE_API_HOUSE;
  const apiReceipt = import.meta.env.VITE_API_RECEIPT;
  const [percentages, setPercentages] = useState(null);
  const [sum, setSum] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { setHouses, userData } = useContext(MyContext);

  const onCloseShare = () => {
    setOpenModal(false);
  };

  const { id } = useParams();

  const [house, setHouse] = useState(null);
  const [receipts, setReceipts] = useState(null);

  const { houses } = useContext(MyContext);

  useEffect(() => {
    setHouse(houses?.find((house) => Number(house.id) === Number(id)));
  }, [id, houses]);

  // Antes esto leia house.receipts (embebido en la respuesta de casas), lo
  // que forzaba al backend a mandar TODOS los recibos de TODAS las casas en
  // cada carga del listado. Ahora se piden solo los de esta casa, y se
  // vuelve a pedir cuando DataTable/FormEdit avisan que algo cambio.
  const getReceipts = async () => {
    if (!userData?.id || !id) return;
    try {
      const response = await httpClient.get(
        `${apiReceipt}/getReceiptsByHouseAndUser/${userData.id}/${id}`
      );
      setReceipts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReceipts();
  }, [id, userData?.id]);

  const getStatistic = () => {
    if (house) {
      const getTotals = async () => {
        let idHouse = house.id;
        const response = await httpClient.get(
          `${apiUrl}/informationReceipt/${idHouse}`
        );
        const data = response.data;
        return data;
      };

      const getSum = async () => {
        try {
          const response = await httpClient.get(
            `${apiUrl}/sumStatisticByType/${house.name}/${userData.id}`
          );
          const data = response.data;
          return data;
        } catch (error) {
          console.log(error);
        }
      };

      const fetchData = async () => {
        try {
          const totals = await getTotals();
          const sumData = await getSum();
          setPercentages(totals);
          setSum(sumData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  };

  const handleDelete = async () => {
    try {
      await httpClient.delete(`${apiHouse}/delete/${house.id}`);
      getUserHouses(setHouses, userData?.id);
      navigate("/private/major/home");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHome = () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar la casa?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar casa",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  useEffect(() => {
    getStatistic();
  }, [house]);

  return (
    <UserHomeLayout>
      <div className="house_title">
        <div className="house_information">
          <h2>Información de la casa</h2>
          <p>{house?.name}</p>
          <p>Cantidad Facturas: {receipts?.length ?? 0}</p>
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
        <LineChart data={receipts} colors={USER_HOME_DETAIL_CHART_COLORS} showGrid />
      </div>

      <div className="totals container_charts">
        <Totals percentages={percentages} />
      </div>

      <div className="donut section">
        {percentages?.percentage &&
        typeof percentages.percentage === "number" &&
        sum ? (
          <>
            {percentages.percentage === 0 ? (
              <p>No tienes suficientes recibos</p>
            ) : (
              <ChartDoughnut
                value={Math.abs(percentages.percentage).toFixed(1)}
                percentages={percentages.percentage.toFixed(1)}
                datos={sum}
              />
            )}
          </>
        ) : (
          <p>No tienes suficientes recibos</p>
        )}
      </div>

      <div className="data_table section">
        <DataTable data={receipts} onReceiptChange={getReceipts} />
      </div>

      <Modal isOpen={openModal} onClose={onCloseShare}>
        <UpdateHouse data={house} onClose={onCloseShare} />
      </Modal>
    </UserHomeLayout>
  );
};

export default UserHomeDetail;
