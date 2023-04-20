import React, { useState } from 'react';
import axios from 'react-axios';

function Reset() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/12', { email });
      console.log(response.data);
      // Display a success message to the user
    } catch (error) {
      console.log(error.response.data);
      // Display an error message to the user
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
