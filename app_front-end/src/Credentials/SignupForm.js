import "./Container.css";
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = 'http://127.0.0.1:1245';

    await axios.post('/users', {
      email: email,
      password: password,
    }).then(response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <form  onSubmit={handleSubmit}>
      <div className="User_forms">
        <div className="User_forms-User_forms">
          <label>User Email</label>
          <input type="email" name={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address"/>
        </div>
        <div className="User_forms-User_forms">
          <label>Password</label>
          <input type="password" name={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
        </div>
        <div className="User_form-User_Submission">
          <div className="User_form-User_Agree">
            <input type="checkbox" name="" value="" />
            <label>You agree to our friendly <a href="/privacy">privacy policy</a>.</label>
          </div>
          <input type="submit" name="" value="Signup" />
        </div>
      </div>
    </form>
  );
}

export default SignUp;
