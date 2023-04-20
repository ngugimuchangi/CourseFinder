import axios from 'axios';
import "./Container.css";

function SignUp() {
  const onSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value
    };

    axios.post('/api/users', formData)
      .then(response => {
        console.log(response.data);
        // display success message or redirect to different page
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="User_forms">
        <div className="User_forms-User_forms">
          <label>User Email</label>
          <input type="email" name="email" placeholder="Enter email address"/>
        </div>
        <div className="User_forms-User_forms">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Password" />
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
