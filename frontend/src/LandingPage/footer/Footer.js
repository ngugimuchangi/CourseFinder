import './Footer.css';
import { Link } from 'react-scroll';


function Footer() {
        return (
                <div className="Footer">
                        <ul className="Links">
                                <li className="Link"><Link to="hero"spy={true} smooth={true} offset={-100} duration={500}>Back to top</Link></li>
                                <li className="Link"><Link to="team"spy={true} smooth={true} offset={-100} duration={500}>About us</Link></li>
                                <li className="Link"><Link to="services"spy={true} smooth={true} offset={-100} duration={500}>Services</Link></li>
                                <li className="Link">
                                        <a href="/privacy">Privacy policy</a>
                                </li>
                                <li className="Link">
                                        <a href="/terms">Terms of Use</a>
                                </li>
                        </ul>
                </div>
        );
}

export default Footer;