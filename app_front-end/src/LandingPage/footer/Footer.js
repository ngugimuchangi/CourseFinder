import './Footer.css';


function Footer() {
        return (
                <div className="Footer">
                        <ul className="Links">
                                <li className="Link">About us</li>
                                <li className="Link">Contact</li>
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