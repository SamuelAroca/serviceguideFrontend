import axios from "axios";
import styles from "./Styles/Home.module.css";
import GetLastReceipts from "./components/GetLastReceipts";
import StatisticsHome from "./components/StatisticsHome";
import { MyContext } from "../../context/UserContext";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import LineChart from "./components/LineChart";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const navigate = useNavigate();
  const [allReceipts, setAllReceipts] = useState(null);
  const [receipts, setReceipts] = useState(null);

  const { userData } = useContext(MyContext);

  useEffect(() => {
    if (userData === null) return;
    initAxiosInterceptor();
    tokenExist();
    getReceipts();
    getAllReceipts();
  }, [userData]);

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
    const receipt = await axios.get(`${apiUrl}/getLastReceipt/${userData?.id}`);
    try {
      setAllReceipts(receipt.data);
    } catch (err) {
      console.log(err, "Error recibo ultimo");
    }
  };

  const getAllReceipts = async () => {
    try {
      const receipts = await axios.get(
        `${apiUrl}/allReceiptsByUserId/${userData?.id}`
      );
      setReceipts(receipts.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className={styles.main}>
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

          <div className={styles.last_graphic}>
            <StatisticsHome idReceipt={allReceipts} typeReceipt={allReceipts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
