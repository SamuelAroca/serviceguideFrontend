import "./App.css";
import Login from "./pages/home/components/Login";
import Register from "./pages/home/components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import News from "./pages/News/News";
import NotFound from "./pages/home/components/NotFound";
import Receipts from "./pages/private/Receipts";
import Statistics from "./pages/private/Statistics";
import Home from "./pages/private/Home";
import Houses from "./pages/private/Houses";
import AddReceipts from "./pages/private/components/AddReceipt";
import AddHouse from "./pages/private/components/AddHouse";
import SavedStatistic from "./pages/private/components/SavedStatistic";

const App = () => {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/major" element={<Home />} />
        <Route path="/major/home" element={<Home />} />
        <Route path="/major/receipts/*" element={<Receipts />} />
        <Route path="/major/receipts/addreceipts" element={<AddReceipts />} />
        <Route path="/major/houses" element={<Houses />} />
        <Route path="/major/houses/addhouse" element={<AddHouse />} />
        <Route path="/major/statistics" element={<Statistics />} />
        <Route path="/major/statistics/savedstatistics" element={<SavedStatistic />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
