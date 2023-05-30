import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import AllReceiptsCards from "./components/receipts/AllReceiptsCard";
import Loader from "./Loader";
import axios from "axios";

const Receipts = () => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [allReceipts, setAllReceipts] = useState(null);

  useEffect(() => {
    initAxiosInterceptor();
    getReceipts();
  }, []);

  const getReceipts = async () => {
    let accessToken = getToken();
    setLoading(true);
    const data = await axios.get(
      `${apiUrl}/allReceiptsByUserId/${accessToken}`
    );
    try {
      setAllReceipts(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getInformation = async () =>{
    getReceipts();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5rem",
        width: "90%",
        marginLeft: "12rem"
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <AllReceiptsCards data={allReceipts} getInformation={getInformation} />
          }
        />
      </Routes>
      <Loader visible={loading} />
      <SideNav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Receipts;
