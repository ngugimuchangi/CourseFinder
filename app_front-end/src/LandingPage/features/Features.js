import './Features.css';
import alx from '../Images/Logos/alx.png';
import udacity from'../Images/Logos/Udacity.png';
import udemy from '../Images/Logos/udemy.svg';
import hi_emoji from '../Images/Logos/hi_emoji.webp';


export default function Features() {
        return (
                <section id="services" className="Features_section">
                        <div className="service">
                                <h1>Services</h1>
                                <p>
                                We help users find their desired courses and get notified about new
                                 and readily free courses offered in the market. We are hooked for you 
                                </p>
                        </div>
                        <div className="Logos">
                                <img className="Logos-Udemy" src={udemy} alt="Udemy Logo" />
                                <img className="Logos-Alx" src={alx} alt="Alx Logo" />
                                <img className="Logos-Udacity" src={udacity} alt="Udacity Logo" />
                        </div>
                        <div className="Greatings">
                                <img className="Greatings-Emoji" src={hi_emoji} alt="Hi hand emoji" />
                                <p className="Greatings-text">Ready to Explore new free Courses?</p>
                                <a href="/"className="Greatings-btn_link">Learn more</a>
                        </div>
                </section>
        );
}