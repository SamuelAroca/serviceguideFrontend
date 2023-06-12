import "./App.css";
import Index from "./pages/Index/Index";
import ChangePasword from "./pages/Index/components/ChangePasword";
import AuthGuard from "./guards/AuthGuard";
import Login from "./pages/Login/Login";
import PrivateRoutes from "./pages/PrivateRoutes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import {
  getUserDataService,
  getUserInformation,
} from "./services/get-user-data.service";
import { getUserHousesService } from "./services/get-user-houses.service";
import NotFound from "./components/NotFound";
import Cookies from "js-cookie";

const App = () => {
  const { updateUserData, setHouses, setUserData, userData } =
    useContext(MyContext);

  const accesTocken = Cookies.get("token");

  const getUser = async () => {
    try {
      const data = await getUserInformation();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      const data = await getUserHousesService(userData.id);
      setHouses(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserData();
    getUser();
  }, [accesTocken]);

  useEffect(() => {
    if (userData !== null) {
      getUserHouses();
    }
  }, [userData]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login/*" element={<Login />} />
      <Route
        path="/change-password/:passwordToken"
        element={<ChangePasword />}
      />
      <Route element={<AuthGuard />}>
        <Route path="/private/*" element={<PrivateRoutes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
