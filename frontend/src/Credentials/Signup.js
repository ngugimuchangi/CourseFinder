import "./Container.css";
import Logo from "./images/logo.png";
import SignUp from './SignupForm';

function Signup() {
        return (
                <div className="Container" id="singup">
                        <header>
                                <div className="Header-Container">
                                <a href="/"><img src={Logo} alt="Logo" /></a>
                                        <ul>
                                                <li>
                                                        <a href="/login">Login</a>
                                                </li>
                                        </ul>
                                </div>
                        </header>
                        <div className="Landings">
                                <div className="Landings-Continer">
                                        <div className="Landings-sections">
                                                <h1>Signup</h1>
                                                <SignUp />
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default Signup;