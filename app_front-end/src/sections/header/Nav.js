import "./Nav.css";
import { useState } from "react";
import logo from './logo.png';
import { Link } from 'react-scroll';

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
      <ul className="Navigation-links">
        <li className="Navigation-link" href="/">
        <Link to="hero" spy={true} smooth={true} offset={-100} duration={500}>Home</Link>
        </li>
        <li className="Navigation-link" href="/">
          <Link to="services" spy={true} smooth={true} offset={-76} duration={500}>Services</Link>
        </li>
        <li className="Navigation-link" href="/">
        <Link to="team" spy={true} smooth={true} offset={-80} duration={500}>Team</Link>
        </li>
        <li className="Navigation-link" href="/">
        <Link to="Contact" spy={true} smooth={true} offset={-80} duration={500}>Contact Us</Link>
        </li>
        <li className="Navigation-link" href="/">
          Singup
        </li>
        <li className="Navigation-link" href="/">
          Login
        </li>
      </ul>
    </div>
  );
}

export default Nav;
