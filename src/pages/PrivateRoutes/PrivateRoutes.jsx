import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../private/Home";
import Receipts from "../private/Receipts";
import AddReceipt from "../private/components/receipts/AddReceipt";
import Houses from "../private/Houses";
import AddHouse from "../private/components/house/AddHouse";
import Statistics from "../private/Statistics";
import SavedStatistic from "../private/components/statistics/SavedStatistic";
import { DashboardGrid } from "../../styled-components/dashboard-grid.styled";
import Sidebar from "../../components/Sidebar";

const PrivateRoutes = () => {
  return (
    <DashboardGrid>
      <div className="nav">
        <h1>Nav</h1>
      </div>
      <div className="sidenav">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/major/home/*" replace />} />
          <Route path="/major/home/*" element={<Home />} />
          <Route path="/major/receipts/*" element={<Receipts />} />
          <Route path="/major/receipts/addreceipt" element={<AddReceipt />} />
          <Route path="/major/houses/*" element={<Houses />} />
          <Route path="/major/houses/addhouse" element={<AddHouse />} />
          <Route path="/major/statistics" element={<Statistics />} />
          <Route
            path="/major/statistics/savedstatistics"
            element={<SavedStatistic />}
          />
        </Routes>
      </div>
    </DashboardGrid>
  );
};

export default PrivateRoutes;
