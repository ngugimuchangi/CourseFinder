import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  // Add useEffect hook to check for isLoggedIn value on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    window.location.href = "/";
  } else {
    return (
      <div>
        <nav className="main-menu">
          <ul>
          <li>
              <Link to={location.pathname}>
                <span className="DashboardHeading">{location.pathname.replace(/\//g, "")}</span>
              </Link>
            </li>
            <li className={location.pathname === "/dashboard" ? "active" : ""}>
              <Link to="/dashboard">
                <i className="fa fa-4x">📚 </i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className={location.pathname === "/bookmarks" ? "active" : ""}>
              <Link to="/bookmarks">
                <i className="fa fa-4x">🔖</i>
                <span className="nav-text">Bookmarks</span>
              </Link>
            </li>
            <li className={location.pathname === "/settings" ? "active" : ""}>
              <Link to="/settings">
                <i className="fa fa-4x">⚙️</i>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="/" onClick={handleLogout}>
                <i className="fa fa-power-off fa-2x"></i>
                <span className="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
