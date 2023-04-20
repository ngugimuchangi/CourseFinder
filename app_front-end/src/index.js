import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./LandingPage/Home";
import Signup from "./Credentials/Signup";
import Login from "./Credentials/Login";
import Reset from "./Credentials/Reset";
import NotFound from "./ErrorHandler/404";
import Dashboard from "./Dashboard/Dashboard";
import PrivacyPopup from "./OnlinePrivacy";
import Terms from "./TermsPolicy";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/privacy" element={<PrivacyPopup />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
