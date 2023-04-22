import "./Dashboard.css";
import NavBar from "./Nav";
import { useState, useEffect } from "react";


function BookMarks() {
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
      <div className="DashBoard" id="bookmarks">
        <NavBar />
        <div className="ContentArea">
            <header className="Title">
                <h1>Bookmarks</h1>
            </header>
            <section className="Content"></section>
        </div>
      </div>
    );
  }
}


export default BookMarks;