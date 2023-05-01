import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import AllHousesCard from "./components/house/AllHousesCard";
import Loader from "./Loader";
import axios from "axios";

const Houses = () => {
  const apiUrl = "http://localhost:8080";

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [allHouses, setAllHouses] = useState(null);

  useEffect(() => {
    initAxiosInterceptor();
    getHouses();
  }, []);

  const getHouses = async () => {
    let accessToken = getToken();
    console.log(accessToken);
    try {
      setLoading(true);
      const data = await axios.get(
        `${apiUrl}/api/house/findAllByUserOrderById/${accessToken}`
      );
      setAllHouses(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
        <Route path="/" element={<AllHousesCard data={allHouses} />} />
      </Routes>
      <Loader visible={loading} />
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Houses;
