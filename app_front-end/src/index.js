import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./sections/header/Header";
import Features from "./sections/features/Features";
import About from "./sections/about/About";
import Contact from "./sections/contact/Contact";
import Footer from './sections/footer/Footer';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Features />
    <About />
    <Contact />
    <Footer />
  </React.StrictMode>
);
