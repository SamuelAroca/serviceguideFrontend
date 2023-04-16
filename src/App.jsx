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

const App = () => {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/major" element={<Home />} />
        <Route path="/major/home" element={<Home />} />
        <Route path="/major/receipts/*" element={<Receipts />} />
        <Route path="/major/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
