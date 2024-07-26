import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
