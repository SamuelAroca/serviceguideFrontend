import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { DashboardGrid } from "../../styled-components/dashboard-grid.styled";
import Sidebar from "../../components/Sidebar";
import RouteLoader from "../../components/RouteLoader";

const Home = lazy(() => import("../Home/Home"));
const AddReceipt = lazy(() => import("../addReceipt/AddReceipt"));
const AddHouse = lazy(() => import("../addHouse/AddHouse"));
const UserHomeDetail = lazy(() => import("../UserHomeDetail/UserHomeDetail"));
const UserSettings = lazy(() => import("../userSettings/UserSettings"));
const NotFound = lazy(() => import("../../components/NotFound"));

const PrivateRoutes = () => {
  return (
    <DashboardGrid>
      <div className="sidenav">
        <Sidebar />
      </div>
      <div className="content">
        <Suspense fallback={<RouteLoader fullScreen={false} />}>
          <Routes>
            <Route path="/" element={<Navigate to="/major/home/*" replace />} />
            <Route path="/major/home/*" element={<Home />} />
            <Route path="/major/receipts/addreceipt" element={<AddReceipt />} />
            <Route path="/house-detail/:id" element={<UserHomeDetail />} />
            <Route path="/major/houses/addhouse" element={<AddHouse />} />
            <Route path="/major/user/settings" element={<UserSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </DashboardGrid>
  );
};

export default PrivateRoutes;
