import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./LandingPage/Home";
import Programs from "./programs/programs";
import Signup from "./Credentials/Signup";
import Login from "./Credentials/Login";
import Reset from "./Credentials/Reset";
import EmailVerification from "./Credentials/verifyEmail";
import ResetPassword from "./Credentials/resetPassword";
import NotFound from "./ErrorHandler/404";
import Dashboard from "./Dashboard/Dashboard";
import BookMarks from "./Dashboard/Bookmarks";
import Settings from "./Dashboard/Settings";
import PrivacyPopup from "./OnlinePrivacy";
import Terms from "./TermsPolicy";
import AuthService from './api/authService';

const App = () => {
  const authService = new AuthService();
  const isLoggedIn = authService.isLogedIn();
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/confirmEmail/:Id/:verificationToken" element={<EmailVerification />} />
      <Route path="/reset/:Id/:verificationToken" element={<ResetPassword />} />
      {isLoggedIn ? (
      <>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookmarks" element={<BookMarks />} />
      <Route path="/settings" element={<Settings />} />
      </>
      ) : (<><Route exact path="/" element={<Home />} /></>)
    }
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
