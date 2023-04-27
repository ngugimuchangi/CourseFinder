import { Link, useLocation } from "react-router-dom";
import AuthService from '../api/authService';
import Button from "react-bootstrap/esm/Button";

export default function NavBar() {
  const authService = new AuthService();
  const userLoggedIn = authService.isLogedIn();
  const location = useLocation();

  async function handleLogout() {
      await authService.logout();
  }
return userLoggedIn ? (
      <div className="menu_container">
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
            <li >
              <Button className="Button" onClick={handleLogout} >
                <i className="fa fa-power-off fa-2x"></i>
                <span className="nav-text">Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    ) : (window.location.hreg="/")
}
