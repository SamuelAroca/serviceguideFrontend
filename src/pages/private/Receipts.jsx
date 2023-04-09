import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReceiptsForm from "./components/ReceiptsForm";
import AllReceiptsCards from "./components/AllReceiptsCard";

const Receipts = () => {
  const [open, setOpen] = useState(false);

  const receipts = [
    {
      name: "Monda",
      date: "21/02/2023",
      consumo: "9kWh",
      tipo: "Energía",
      price: "500.000",
    },
    {
      name: "Monda numero 2",
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
        <Route path="/" element={<AllReceiptsCards data={receipts} />} />
        <Route path="/water" element={<ReceiptsForm />} />
        <Route path="/energy" element={<ReceiptsForm />} />
        <Route path="/gas" element={<ReceiptsForm />} />
        <Route path="/sewerage" element={<ReceiptsForm />} />
      </Routes>
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Receipts;
