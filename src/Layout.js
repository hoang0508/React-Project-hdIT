import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ListQuizz from "./components/User/ListQuizz";
import DetailQuizz from "./components/User/DetailQuizz";

const NotFound = () => {
  return (
    <div className="alert alert-danger">
      404 Not found data with your current URL
    </div>
  );
};

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<ListQuizz />} />
        </Route>
        <Route path="/quizz/:id" element={<DetailQuizz />}></Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <ToastContainer />
    </>
  );
};

export default Layout;
