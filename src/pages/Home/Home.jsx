import axios from "axios";
import styled from "./styles/Home.module.css";
import Loader from "./Loader";
import GetLastReceipts from "./components/receipts/GetLastReceipts";
import StatisticsHome from "./components/statistics/StatisticsHome";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const navigate = useNavigate();
  const [allReceipts, setAllReceipts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initAxiosInterceptor();
    tokenExist();
    getReceipts();
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

  return (
    <>
      <div className={styled.prueba}>
        <Loader visible={loading} />

        <div
          style={{
            display: "flex",
            width: "70%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Routes>
            {allReceipts ? (
              <Route
                path="/"
                element={<GetLastReceipts receipt={allReceipts} />}
              />
            ) : null}
          </Routes>
        </div>
        <div className={styled.graphic}>
          <StatisticsHome idReceipt={allReceipts} typeReceipt={allReceipts} />
        </div>
      </div>
    </>
  );
};

export default Home;
