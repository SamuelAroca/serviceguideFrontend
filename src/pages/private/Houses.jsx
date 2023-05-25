import SideNav from "./SideNav";
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

  useEffect(() => {
    initAxiosInterceptor();
    getHouses();
  }, []);

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

  const getInformation = async() =>{
    getHouses();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "5rem",
        marginTop: "5rem",
      }}
    >
      <Routes>
        <Route path="/" element={<AllHousesCard data={allHouses} getInformation={getInformation} />} />
      </Routes>
      <Loader visible={loading} />
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Houses;
