import React, { useState } from 'react';
import axios from 'axios';

function Reset() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/127.0.0.1:1245/auth/reset-password', { email });
      console.log(response.data);
      <div class="alert alert-success" role="alert">
        This is a success alert—check it out!
      </div>
    } catch (error) {
      console.log(error.response.data);
      <div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
      </div>
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="User_forms">
        <div className="User_forms-User_forms">
          <label>User Email</label>
          <input type="email" name="email" placeholder="Enter email address" value={email} onChange={handleEmailChange} />
        </div>
        <div className="User_form-User_Submission">
          <div className="User_form-User_Agree">
            <input className="User_form-btn" type="submit" name="" value="Reset Password" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Reset;
