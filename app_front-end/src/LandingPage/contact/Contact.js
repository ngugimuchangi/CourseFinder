import './Contact.css';
import Form from './Form';

function Contact() {
        return (
                <div className="Contact">
                        <div className="Contact-Continer">
                                <div className="Contact-info">
                                <h3>Contact us</h3>
                                <h2>Get in touch</h2>
                                <p>We’d love to hear from you. Please fill out this form.</p>
                                </div>
                                <Form />
                        </div>
                </div>
        );
}

export default Contact;