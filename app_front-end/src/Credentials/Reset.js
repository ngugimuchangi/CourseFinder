import "./Container.css";
import Logo from "./images/logo.png";
import Reset from './ResetForm';

function Signup() {
        return (
                <div className="Container" id="reset">
                        <header>
                                <div className="Header-Container">
                                <a href="/"><img src={Logo} alt="Logo" /></a>
                                </div>
                        </header>
                        <div className="Landings">
                                <div className="Landings-Continer">
                                        <div className="Landings-sections">
                                                <h1 className="Landings-Reset_header">Reset Password</h1>
                                                <Reset />
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default Signup;;