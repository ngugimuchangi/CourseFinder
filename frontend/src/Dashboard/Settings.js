import "./Dashboard.css";
import NavBar from "./Nav";
import { useState, useEffect } from "react";
import axios from "axios";

function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [emailFormVisible, setEmailFormVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const urls = process.env.REACT_APP_BACKEND_API;

  // Add useEffect hook to check for isLoggedIn value on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    }

    const api = axios.create({
      baseURL: urls,
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('user')
      }
    })
    api.get('/users/me')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [urls]);

  const handleEmailFormSubmit = (e) => {
    e.preventDefault();
    const api = axios.create({
      baseURL: urls,
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('user')
      }
    })
    const email = { 
      email: newEmail,
    }
    api.put(`users/me/email`, email)
      .then(response => {
        setUser(response.data);
        setEmailFormVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
      //email call
      const password = { 
        password: newPassword,
      }
      api.put(`users/me/password`, password)
      .then(response => {
        setUser(response.data);
        setEmailFormVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
return isLoggedIn && (
      <div className="DashBoard" id="settings">
        <NavBar />
        <div className="Mysettings">
          <div className="Mysettings-form">
              <h1>Settings</h1>
                <p>Email: {user.email}</p>
                <p>Password: *********{user.password}</p>
              {emailFormVisible ? (
                <form onSubmit={handleEmailFormSubmit}>
                  <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Change Email address" />
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Change password"/>
                  <button type="submit">Save</button>
                </form>
              ) : (
                <button onClick={() => setEmailFormVisible(true)}>Edit Details</button>
              )}
          </div>
        </div>
      </div>
    )
}


export default Settings;