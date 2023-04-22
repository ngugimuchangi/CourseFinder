import "./Nav.css";
import { useState } from "react";
import logo from '../Images/Logos/logo.png';
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
        <div className="Navigation-Container">
        <Link to="hero" spy={true} smooth={true} offset={-100} duration={500}><img className="Heading" src={logo} alt="Logo" /></Link>
        <ul className="Navigation-links">
          <li className="Navigation-link" href="/">
          <Link to="hero" spy={true} smooth={true} offset={-80} duration={500}>Home</Link>
          </li>
          <li className="Navigation-link" href="/">
            <Link to="services" spy={true} smooth={true} offset={-136} duration={500}>Services</Link>
          </li>
          <li className="Navigation-link" href="/">
          <Link to="team" spy={true} smooth={true} offset={-100} duration={500}>Team</Link>
          </li>
          <li className="Navigation-link" href="/">
          <Link to="Contact" spy={true} smooth={true} offset={-100} duration={500}>Contact Us</Link>
          </li>
          <li className="Navigation-link" href="/">
            <a href="/signup">Singup</a>
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
