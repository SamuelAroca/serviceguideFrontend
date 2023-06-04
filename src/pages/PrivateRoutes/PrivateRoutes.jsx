import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import AddReceipt from "../addReceipt/AddReceipt";
import { DashboardGrid } from "../../styled-components/dashboard-grid.styled";
import AddHouse from "../addHouse/AddHouse";
import Sidebar from "../../components/Sidebar";
import UserHomeDetail from "../UserHomeDetail/UserHomeDetail";
import UserSettings from "../userSettings/UserSettings";
import NotFound from "../../components/NotFound";

const PrivateRoutes = () => {
  return (
    <DashboardGrid>
      <div className="sidenav">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/major/home/*" replace />} />
          <Route path="/major/home" element={<Home />} />
          <Route path="/major/receipts/addreceipt" element={<AddReceipt />} />
          <Route path="/house-detail/:id" element={<UserHomeDetail />} />
          <Route path="/major/houses/addhouse" element={<AddHouse />} />
          <Route path="/major/user/settings" element={<UserSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </DashboardGrid>
  );
};

export default PrivateRoutes;
