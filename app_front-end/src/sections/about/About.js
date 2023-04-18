import "./About.css";
import Twitter from './twitter.png';
import Github from './github.png';
import Linkedin from './Linked_in.png';
import Nav from '../header/Nav'

function About() {
        return (
                <section id="team" className="About_section">
                        <div className="About">
                                <h1>Meet our team</h1>
                                <p className="">
                                Our philosophy is simple — diversity and a grit mind set is a 
                                team of passionate people and foster a culture that empowers 
                                you to do you best work.<br />
                                The following portfolio project is in dedication to our final term of specialization at alx.
                                </p>
                        </div>
                        <div className="Users">
                                <div className="Users-Card">
                                        <div className="Users-Card_image">
                                                <img className="Users-Card_profile" src="" alt="Duncan Muchangi"/>
                                        </div>
                                        <h2 className="Users-Card_name">Duncan Muchangi</h2>
                                        <h3 className="Users-Card_specilization">Back-end Developer</h3>
                                        <p className="Users-Card_info">Former frontend dev for Linear, Coinbase, and Postscript.</p>
                                        <div className="Users-Card_icons">
                                                <img className="Users-Card_icon" src={Twitter} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Github} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Linkedin} alt="Twitter Logo" />
                                        </div>
                                </div>
                                <div className="Users-Card">
                                        <div className="Users-Card_image">
                                                <img className="Users-Card_profile" src=""  alt="Duncan Muchangi"/>
                                        </div>
                                        <h2 className="Users-Card_name">Duncan Muchangi</h2>
                                        <h3 className="Users-Card_specilization">Back-end Developer</h3>
                                        <p className="Users-Card_info">Former frontend dev for Linear, Coinbase, and Postscript.</p>
                                        <div className="Users-Card_icons">
                                                <img className="Users-Card_icon" src={Twitter} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Github} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Linkedin} alt="Twitter Logo" />
                                        </div>
                                </div>
                                <div className="Users-Card">
                                        <div className="Users-Card_image">
                                                <img className="Users-Card_profile" src="" alt="Duncan Muchangi"/>
                                        </div>
                                        <h2 className="Users-Card_name">Duncan Muchangi</h2>
                                        <h3 className="Users-Card_specilization">Back-end Developer</h3>
                                        <p className="Users-Card_info">Former frontend dev for Linear, Coinbase, and Postscript.</p>
                                        <div className="Users-Card_icons">
                                                <img className="Users-Card_icon" src={Twitter} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Github} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Linkedin} alt="Twitter Logo" />
                                        </div>
                                </div>
                                <div className="Users-Card">
                                        <div className="Users-Card_image">
                                                <img className="Users-Card_profile" src="" alt="Duncan Muchangi"/>
                                        </div>
                                        <h2 className="Users-Card_name">Duncan Muchangi</h2>
                                        <h3 className="Users-Card_specilization">Back-end Developer</h3>
                                        <p className="Users-Card_info">Former frontend dev for Linear, Coinbase, and Postscript.</p>
                                        <div className="Users-Card_icons">
                                                <img className="Users-Card_icon" src={Twitter} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Github} alt="Twitter Logo" />
                                                <img className="Users-Card_icon" src={Linkedin} alt="Twitter Logo" />
                                        </div>
                                </div>
                        </div>
                </section>
        );
}

export default About;