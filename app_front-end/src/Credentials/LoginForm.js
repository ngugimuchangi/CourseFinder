import { useState } from 'react';
import axios from 'axios';
import "./Container.css";
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:1245/auth/login', {
        email: email,
        password: password,
      });

      const token = response.data.token;

      Cookies.set('session', token, { expires: 1, path: '/' });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="User_forms">
        <div className="User_forms-User_forms">
          <label>User Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="User_forms-User_forms">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="User_form-User_Submission">
          <div className="User_form-User_Agree Rester">
            <div className="Cont">
              <input type="checkbox" name="remember" value="" />
              <label>Remember</label>
            </div>
            <a className="Resets" href="/reset">
              Reset password
            </a>
          </div>
          <input type="submit" name="login" value="Login" />
        </div>
      </div>
    </form>
  );
}

export default Login;
