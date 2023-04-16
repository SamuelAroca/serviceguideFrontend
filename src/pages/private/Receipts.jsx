import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReceiptsForm from "./components/ReceiptsForm";
import AllReceiptsCards from "./components/AllReceiptsCard";
import axios from "axios";

const Receipts = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [allReceipts, setAllReceipts] = useState(null);

  const apiUrl = "http://localhost:8080";

  const myID = async () => {
    let accessToken = document.cookie.replace("token=", "");
    console.log(accessToken, "ACCESS TOKEN");
    try {
      const result = await axios.get(
        `${apiUrl}/api/users/auth/whoismyid/${accessToken}`
      );
      setUser(result.data);
      console.log(result.data, "result función MYID()");
    } catch (error) {
      alert(error);
    }
  };

  const getWaterReceipts = async () => {
    const data = await axios.get(
      `${apiUrl}/api/receipt/water/findAllByUser/${user}`
    );
    try {
      setAllReceipts(data.data);
      console.log(data, "DATA");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    myID();
    getWaterReceipts();
  }, [user]);

  const receipts = [
    {
      name: "Recibo 1",
      date: "21/02/2023",
      consumo: "9kWh",
      tipo: "Energía",
      price: "500.000",
    },
    {
      name: "Recibo 2",
      date: "21/02/2023",
      consumo: "9kWh",
      tipo: "Energía",
      price: "500.000",
    },
  ];

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
        <Route path="/" element={<AllReceiptsCards data={allReceipts} />} />
        <Route path="/water" element={<ReceiptsForm userId={user} />} />
        <Route path="/energy" element={<ReceiptsForm />} />
        <Route path="/gas" element={<ReceiptsForm />} />
        <Route path="/sewerage" element={<ReceiptsForm />} />
      </Routes>
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Receipts;
