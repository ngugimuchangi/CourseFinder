import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./LandingPage/Home";
import Signup from "./Credentials/Signup";
import Login from "./Credentials/Login";
import Reset from "./Credentials/Reset";
import NotFound from "./ErrorHandler/404";
import Dashboard from "./Dashboard/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);
