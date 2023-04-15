import "./Nav.css";

/**
 * Navigation component section
 */
function Nav() {
  return (
    <div className="Navigation">
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
