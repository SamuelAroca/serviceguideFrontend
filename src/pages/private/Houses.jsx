import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import AllHousesCard from "./components/house/AllHousesCard";
import Loader from "./Loader";
import axios from "axios";

const Houses = () => {
  const apiUrl = import.meta.env.VITE_API_HOUSE;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [allHouses, setAllHouses] = useState(null);

  const getHouses = async () => {
    let accessToken = getToken();
    setLoading(true);
    const data = await axios.get(
      `${apiUrl}/findAllByUserOrderById/${accessToken}`
    );
    try {
      setAllHouses(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAxiosInterceptor();
    getHouses();
  }, []);

  const getInformation = async () => {
    getHouses();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
        width: "90%",
        marginLeft: "12rem",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <AllHousesCard data={allHouses} getInformation={getInformation} />
          }
        />
      </Routes>
      <div>
        <Loader visible={loading} />
      </div>
    </div>
  );
};

export default Houses;
