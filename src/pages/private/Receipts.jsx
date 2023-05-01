import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import ReceiptsForm from "./components/forms/ReceiptsForm";
import AllReceiptsCards from "./components/receipts/AllReceiptsCard";
import axios from "axios";

const Receipts = () => {
  const apiUrl = "http://localhost:8080";

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [allReceipts, setAllReceipts] = useState(null);

  useEffect(() => {
    initAxiosInterceptor();
    myID();
    getReceipts();
  }, [user]);

  const myID = async () => {
    let accessToken = document.cookie.replace("token=", "");
    try {
      const result = await axios.get(
        `${apiUrl}/api/users/auth/whoismyid/${accessToken}`
      );
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReceipts = async () => {
    const data = await axios.get(`${apiUrl}/api/receipt/findByHouse/2`);
    try {
      setAllReceipts(data.data);
    } catch (err) {
      console.log(err);
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
        <Route path="/" element={<AllReceiptsCards data={allReceipts} />} />
        <Route path="/addreceipt" element={<ReceiptsForm userId={user} />} />
      </Routes>
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Receipts;
