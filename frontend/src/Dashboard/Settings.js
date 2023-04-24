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
        <div className="ContentArea settings_section">
          <div className="container">
            <div className="card"> 
              <div className="info"> 
              <i className="fa fa-user fa-2x"style={{scale: '2', top: '40%'}}></i>
                <span style={{scale: '2', margin: '30px'}}>Settings</span> 
              </div> 
              <div className="forms">
                <div className="inputs">
                  <span>Email add</span>
                  <input type="text"  />
                </div>
                <div className="inputs">
                    <span>Password</span>
                    <input type="password" />
                </div>
                <div className="inputs">
                    <span>Confirm password</span>
                    <input type="password" />
                </div> 
              </div>
              <div className="info info_2">
                <button>Save</button>
              </div> 
            </div>
          </div>
        </div>
    </div>
    );
  }
}


export default Settings;