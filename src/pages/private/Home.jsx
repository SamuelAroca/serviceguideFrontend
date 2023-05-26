import SideNav from "./SideNav";
import axios from "axios";
import styled from "./styles/Home.module.css";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import GetLastReceipts from "./components/receipts/GetLastReceipts";
import StatisticsHome from "./components/statistics/StatisticsHome";

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
    console.log(accessToken, "ACCESS TOKEN");
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
      <SideNav />
      <div className={styled.prueba}>
        <Loader visible={loading} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "15rem",
            marginTop: "5rem",
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
        <div
          style={{ marginRight: "7rem", height: "25rem", width: "80rem" }}
          className={styled.graphic}
        >
          <StatisticsHome idReceipt={allReceipts} typeReceipt={allReceipts} />
        </div>
      </div>
    </>
  );
};

export default Home;
