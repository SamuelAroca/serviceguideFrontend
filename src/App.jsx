import "./App.css";
import Register from "./pages/Index/components/Register";
import Index from "./pages/Index/Index";
import NotFound from "./pages/Index/components/NotFound";
import Receipts from "./pages/private/Receipts";
import Statistics from "./pages/private/Statistics";
import Home from "./pages/private/Home";
import Houses from "./pages/private/Houses";
import AddReceipt from "./pages/private/components/receipts/AddReceipt";
import AddHouse from "./pages/private/components/house/AddHouse";
import SavedStatistic from "./pages/private/components/statistics/SavedStatistic";
import ForgotPassword from "./pages/Index/components/ForgotPassword";
import ChangePasword from "./pages/Index/components/ChangePasword";
import UserSettings from "./pages/private/components/UserSettings/UserSettings";
import AuthGuard from "./guards/AuthGuard";
import SideNav from "../src/pages/private/SideNav";
import Login from "./pages/Login/Login";
import PrivateRoutes from "./pages/PrivateRoutes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { getUserDataService } from "./services/get-user-data.service";
import { getUserHousesService } from "./services/get-user-houses.service";
import { initAxiosInterceptor } from "./AxiosHelper";

initAxiosInterceptor();

const App = () => {
  const { updateUserData, setHouses, houses, user } = useContext(MyContext);

  const getUserData = async () => {
    try {
      const data = await getUserDataService();
      updateUserData(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserHouses = async () => {
    try {
      const data = await getUserHousesService();
      setHouses(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserHouses();
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login/*" element={<Login />} />
      <Route
        path="/change-password/:passwordToken"
        element={<ChangePasword />}
      />
      {/*    <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user/settings/update" element={<UserSettings />} />
      <Route path="*" element={<NotFound />} /> */}
      <Route element={<AuthGuard />}>
        <Route path="/private/*" element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default App;
