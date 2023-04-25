import "./Form.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';
import axios from 'axios';


function sendEmail(data) {
        axios.post('http://127.0.0.1:1245', data)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
}


function Form() {
        const [value, setValue] = useState();

        const handleSubmit = (event) => {
                event.preventDefault();
                const data = new FormData(event.target);
                sendEmail({
                  firstName: data.get('firstName'),
                  lastName: data.get('lastName'),
                  email: data.get('email'),
                  phone: value,
                  message: data.get('message')
                });
        };

        return (
                <form onSubmit={handleSubmit}>
                        <div className="User_form">
                                <div className="User_form-User_names">
                                        <div className="User_form-User_forms">
                                                <label>First name</label>
                                                <input type="text" name="" placeholder="First name"/>
                                        </div>
                                        <div className="User_form-User_forms">
                                                <label>Last name</label>
                                                <input type="text" name="" placeholder="Last name" />
                                        </div>
                                </div>
                                <div className="User_form-User_forms">
                                        <label>Email</label>
                                        <input type="email" name="" placeholder="you@company.com" />
                                </div>
                                <div className="User_form-User_forms">
                                        <label>Phone number</label>
                                        <PhoneInput
                                                placeholder="+(000) 00-000-000"
                                                value={value}
                                                onChange={setValue}/>
                                </div>
                                <div className="User_form-User_forms">
                                        <label>Message</label>
                                        <input className="Message" type="text" />
                                </div>
                                <div className="User_form-User_Submission">
                                        <div className="User_form-User_Agree">
                                        <input type="checkbox" name="" value="" />
                                        <label>You agree to our friendly <a href="/privacy">privacy policy</a>.</label>
                                        </div>
                                        <input type="submit" name="" value="Send Message" />
                                </div>
                        </div>
                </form>
        );
}

export default Form;
