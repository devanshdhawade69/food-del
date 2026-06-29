import React from "react";
import Navbar from "./componets/navbar/Navbar.jsx";
import Sidebar from "./componets/sidebar/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List.jsx";
import Add from "./pages/Add/Add.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const URL = "https://food-del-backend-bbcg.onrender.com";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={URL} />} />
          <Route path="/list" element={<List url={URL} />} />
          <Route path="/orders" element={<Orders url={URL} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
