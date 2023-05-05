import "./Container.css";
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to our privacy policy to sign up.");
      return;
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = 'http://127.0.0.1:1245';

    await axios.post('/users', {
      email: email,
      password: password,
    }).then(response => {
      console.log(response.data);
      setIsSuccess(true);
      setTimeout(() => {
      window.location.href = "/login"
      }, 2000);
    }).catch(err => {
      console.log("user already exist", err);
      setIsRegistered(true);
      setTimeout(() => {
        setIsRegistered(false);
      }, 2000);
    });
  }

  return (
    <>
      {isSuccess ? (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
          </svg>
          <div>Welcome, signing up was successful!</div>
        </div>
      ) : 
          isRegistered && 
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="danger:"
          >
          </svg>
          <div>User already registered. Please login....</div>
          
        </div>
      
    }
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
              <input type="checkbox" name="agree-to-terms" value={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
              <label>You agree to our friendly <a href="/privacy">privacy policy</a>.</label>
            </div>
            <input type="submit" name="" value="Signup" />
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
