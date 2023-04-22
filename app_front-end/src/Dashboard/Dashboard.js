import "./Dashboard.css";
import NavBar from "./Nav";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState([]);

  // Add useEffect hook to check for isLoggedIn value on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    }

    // API call to get user details
    axios.defaults.headers.get['Content-Type'] = 'application/json';
    axios.defaults.headers.get['X-Token '] = Cookies.get("session");
    axios.defaults.baseURL = 'http://127.0.0.1:1245';
    
    axios.get("/categories").then((response) => {
        setUser(response.data);
    });
  }, []);

  if (!isLoggedIn) {
    window.location.href = "/";
  } else {
    return (
      <div className="DashBoard" id="dashboard">
        <NavBar />
        <div className="ContentArea">
            <header className="Title">
                <h1>DashBoards</h1>
            </header>
            <section className="Content">
            {user.map(item => (
                <div key={item.id}>
                    <h1>{item.id}</h1>
                    <h2>{item.title}</h2>
                    <h3>{item.url}</h3>
                </div>
            ))}
            </section>
        </div>
      </div>
    );
  }
}

export default Dashboard;
