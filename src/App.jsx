import "./App.css";
import Index from "./pages/Index/Index";
import ChangePasword from "./pages/Index/components/ChangePasword";
import AuthGuard from "./guards/AuthGuard";
import Login from "./pages/Login/Login";
import PrivateRoutes from "./pages/PrivateRoutes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { getUserDataService } from "./services/get-user-data.service";
import { getUserHousesService } from "./services/get-user-houses.service";
import { initAxiosInterceptor } from "./AxiosHelper";
import NotFound from "./components/NotFound";
import Cookies from "js-cookie";

initAxiosInterceptor();

const App = () => {
  const { updateUserData, setHouses, user } = useContext(MyContext);
  const accesTocken = Cookies.get("token");
  console.log(accesTocken, "APP ACCES TOKEN APP COMPONENT");

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
    if (accesTocken) {
      getUserData();
      getUserHouses();
    }
  }, [accesTocken]);

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
