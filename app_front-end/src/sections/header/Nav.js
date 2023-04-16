import "./Nav.css";
import { useState } from "react";
import logo from './logo.png';

/**
 * Navigation component section
 */
function Nav() {
  const [fix, setFixed] = useState(false);

  function scrollFixed() {
    if (window.scrollY >= 1) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }
  window.addEventListener("scroll", scrollFixed);
  return (
    <div className={fix ? "Navigation Fixed": "Navigation"}>
      <img className={fix ? "Heading Logo": "Heading"} src={logo} alt="Logo" />
      <div className="Navigation-links">
        <a className="Navigation-link" href="/">
          Home
        </a>
        <a className="Navigation-link" href="/">
          Services
        </a>
        <a className="Navigation-link" href="/">
          About Us
        </a>
        <a className="Navigation-link" href="/">
          Singup
        </a>
        <a className="Navigation-link" href="/">
          Login
        </a>
      </div>
    </div>
  );
}

export default Nav;
