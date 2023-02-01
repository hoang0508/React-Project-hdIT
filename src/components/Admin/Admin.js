import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Admin.scss";
import "react-pro-sidebar/dist/css/styles.css";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className="admin-container">
        <div className="admin-sidebar">
          <Sidebar collapsed={collapsed} />
        </div>
        <div className="admin-content">
          <div className="admin-header">
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </div>
          <div className="admin-main">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;
