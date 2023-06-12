import axios from "axios";
import styles from "./Styles/Home.module.css";
import GetLastReceipts from "./components/GetLastReceipts";
import StatisticsHome from "./components/StatisticsHome";
import { MyContext } from "../../context/UserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import LineChart from "./components/LineChart";
import Cookies from "js-cookie";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const accessToken = Cookies.get("token");
  const navigate = useNavigate();
  const [allReceipts, setAllReceipts] = useState(null);
  const [receipts, setReceipts] = useState(null);

  const { userData } = useContext(MyContext);

  useEffect(() => {
    if (userData === null) return;
    getReceipts();
    getAllReceipts();
  }, [userData]);

  const getReceipts = async () => {
    const receipt = await axios.get(
      `${apiUrl}/getLastReceipt/${userData?.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    try {
      setAllReceipts(receipt.data);
    } catch (err) {
      console.log(err, "Error recibo ultimo");
    }
  };

  const getAllReceipts = async () => {
    try {
      const receipts = await axios.get(
        `${apiUrl}/allReceiptsByUserId/${userData?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setReceipts(receipts.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.main}>
      <h3>COMPORTAMIENTO DEL PRECIO DE TUS RECIBOS</h3>
      <div className={styles.container_graphics}>
        <div className={styles.line_chart_container}>
          <LineChart data={receipts} />
        </div>
      </div>
      <h3>Ultimo Recibo y Comparacion con el anterior</h3>
      <div className={styles.card}>
        <div>
          <Routes>
            {allReceipts ? (
              <Route
                path="/"
                element={<GetLastReceipts receipt={allReceipts} />}
              />
            ) : null}
          </Routes>
        </div>

        <div className={styles.last_graphic}>
          <StatisticsHome idReceipt={allReceipts} typeReceipt={allReceipts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
