import axios from "axios";
import styles from "./Styles/Home.module.css";
import Loader from "../../components/Loader";
import GetLastReceipts from "./components/GetLastReceipts";
import StatisticsHome from "./components/StatisticsHome";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LineChart from "./components/LineChart";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const navigate = useNavigate();
  const [allReceipts, setAllReceipts] = useState(null);
  const [receipts, setReceipts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initAxiosInterceptor();
    tokenExist();
    getReceipts();
    getAllReceipts();
  }, []);

  const tokenExist = () => {
    if (!getToken()) {
      navigate("/");
    }
  };

  const sessionExpired = () => {
    Swal.fire({
      title: "Your session has expired!",
      text: "You will have to log in again!",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok, login again",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        return;
      }
    });
  };

  const getReceipts = async () => {
    const accessToken = getToken();
    setLoading(true);
    const receipt = await axios.get(`${apiUrl}/getLastReceipt/${accessToken}`);
    try {
      setAllReceipts(receipt.data);
    } catch (err) {
      console.log(err, "Error recibo ultimo");
    } finally {
      setLoading(false);
    }
  };

  const getAllReceipts = async () => {
    const accessToken = getToken();
    try {
      const receipts = await axios.get(
        `${apiUrl}/allReceiptsByUserId/${accessToken}`
      );
      setReceipts(receipts.data);
      /* console.log(receipts, "PROMISE"); */
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <Loader visible={loading} />
        <h3>COMPORTAMIENTO DE TUS RECIBOS</h3>
        <div className={styles.container_graphics}>
          <div className={styles.line_chart_container}>
            <LineChart data={receipts} />
          </div>
        </div>
        <h3>Ultimo Recibo y Comparacion el anterior</h3>
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

          <div className={styles.graphic}>
            <StatisticsHome idReceipt={allReceipts} typeReceipt={allReceipts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
