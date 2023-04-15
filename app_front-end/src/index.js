import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Nav from "./sections/header/Nav";
import Landing from "./sections/landing_page/Landing"
import Features from "./sections/features/Features"
import Footer from './sections/footer/Footer'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Nav />
    <Landing />
    <Features />
    <Footer />
  </React.StrictMode>
);
