import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();
