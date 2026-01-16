import React from "react";
import Navbar from "./componets/navbar/Navbar";
import Sidebar from "./componets/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const URL = "http://localhost:4000";

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
