import "./App.css";
import AuthGuard from "./guards/AuthGuard";
import { Routes, Route } from "react-router-dom";
import { MyContext } from "./context/UserContext";
import { useContext, useEffect, lazy, Suspense } from "react";
import {
  getUserDataService,
  getUserInformation,
} from "./services/get-user-data.service";
import { getUserHousesService } from "./services/get-user-houses.service";
import Cookies from "js-cookie";

// Carga perezosa por sección: quien visite la landing pública no debería
// descargar el bundle del dashboard privado (charts, tablas, etc.) y viceversa.
const Index = lazy(() => import("./pages/Index/Index"));
const ChangePasword = lazy(() =>
  import("./pages/Index/components/ChangePasword")
);
const Login = lazy(() => import("./pages/Login/Login"));
const PrivateRoutes = lazy(() =>
  import("./pages/PrivateRoutes/PrivateRoutes")
);
const NotFound = lazy(() => import("./components/NotFound"));

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
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

export default App;
