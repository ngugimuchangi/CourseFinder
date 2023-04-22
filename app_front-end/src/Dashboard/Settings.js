import "./Dashboard.css";
import NavBar from "./Nav";
import { useState, useEffect } from "react";

function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Add useEffect hook to check for isLoggedIn value on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    window.location.href = "/";
  } else {
    return (
      <div className="DashBoard" id="settings">
        <NavBar />
        <div className="ContentArea">
            <header className="Title">
                <h1>Settings</h1>
            </header>
            <section className="Content">
              <p>
                content
              </p>
            </section>
        </div>
      </div>
    );
  }
}


export default Settings;