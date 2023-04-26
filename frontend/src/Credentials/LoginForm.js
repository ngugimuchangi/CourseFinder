import { useState } from 'react';
import AuthService from '../api/authService';
import "./Container.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNotSuccess, setisNotSuccess] = useState(false);
  const authService = new AuthService();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login(email, password);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.token));
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
      setisNotSuccess(true)
    }

  }

  return (
    <>
    {isNotSuccess && (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <svg
          className="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        >
        </svg>
        <div>Incorrect Email or Password please try again</div>
      </div>
    )}
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
    </>
  );
}

export default Login;