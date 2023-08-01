import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Cities from "./components/Cities";
import CityDetail from "./components/CityDetail";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Error404 from "./components/Error404";

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CallToAction />}></Route>
        <Route path="/cities" element={<Cities />}></Route>
        <Route path="/cityDetails/:id" element={<CityDetail />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/register" element={<Login />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
      {location.pathname !== "/" && location.pathname !== "/cities" && (
        <Footer />
      )}
    </>
  );
}

export default App;
