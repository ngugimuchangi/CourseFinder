import "./Nav.css";
import { useState } from "react";
import logo from '../LandingPage/Images/Logos/logo.png';

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
        <div className="Navigation-Container">
        <a href="/" spy={true} smooth={true} offset={-100} duration={500}><img className="Heading" src={logo} alt="Logo" /></a>
        <ul className="Navigation-links">
          <li className="Navigation-link" href="/">
          <a href="/" spy={true} smooth={true} offset={-80} duration={500}>Home</a>
          </li>
          <li className="Navigation-link" href="/">
            <a href="/signup">Signup</a>
          </li>
          <li className="Navigation-link" href="/">
          <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
