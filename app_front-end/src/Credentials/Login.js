import "./Container.css";
import Logo from "./images/logo.png";
import Login from './LoginForm';

function Signup() {
        return (
                <div className="Container" id="login">
                        <header>
                                <div className="Header-Container">
                                <a href="/"><img src={Logo} alt="Logo" /></a>
                                        <ul>
                                                <li>
                                                        <a href="/signup">Signup</a>
                                                </li>
                                        </ul>
                                </div>
                        </header>
                        <div className="Landings">
                                <div className="Landings-Continer">
                                        <div className="Landings-sections">
                                                <h1>Login</h1>
                                                <Login />
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default Signup;;