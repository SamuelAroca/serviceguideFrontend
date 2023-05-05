import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import AllReceiptsCards from "./components/receipts/AllReceiptsCard";
import Loader from "./Loader";
import axios from "axios";

const Receipts = () => {
  const apiUrl = "http://localhost:8080";

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
      `${apiUrl}/api/receipt/allReceiptsByUserId/${accessToken}`
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
        marginLeft: "5rem",
        marginTop: "5rem",
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
