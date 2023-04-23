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
    try {
      const result = await axios.get(
        `${apiUrl}/api/users/auth/whoismyid/${accessToken}`
      );
      setUser(result.data);
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    myID();
    getWaterReceipts();
  }, [user]);

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
        <Route path="/addreceipt" element={<ReceiptsForm userId={user} />} />
      </Routes>
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Receipts;
