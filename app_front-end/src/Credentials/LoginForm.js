import { useState } from "react";
import axios from "axios";
import "./Container.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Make axios call to get user details from backend
      const response = await axios.get(`/api/users/${email}`);
      const user = response.data;

      // Handle authentication logic here
      // ...

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="User_forms">
        <div className="User_forms-User_forms">
          <label>User Email</label>
          <input
            type="email"
            name=""
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="User_forms-User_forms">
          <label>Last name</label>
          <input
            type="password"
            name=""
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="User_form-User_Submission">
          <div className="User_form-User_Agree Rester">
            <div className="Cont">
              <input type="checkbox" name="" value="" />
              <label>Remember</label>
            </div>
            <a className="Resets" href="/reset">
              Reset password
            </a>
          </div>
          <input type="submit" name="" value="Login" />
        </div>
      </div>
    </form>
  );
}

export default Login;
