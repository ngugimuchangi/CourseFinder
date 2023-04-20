import "./Container.css";

function SignUp() {
        return (
                <form>
                        <div className="User_forms">
                                <div className="User_forms-User_forms">
                                        <label>User Email</label>
                                        <input type="email" name="" placeholder="Enter email address"/>
                                </div>
                                <div className="User_forms-User_forms">
                                        <label>Last name</label>
                                        <input type="password" name="" placeholder="Enter Password" />
                                </div>
                                <div className="User_form-User_Submission">
                                        <div className="User_form-User_Agree">
                                        <input type="checkbox" name="" value="" />
                                        <label>You agree to our friendly <a href="/">privacy policy</a>.</label>
                                        </div>
                                        <input type="submit" name="" value="Signup" />
                                </div>
                        </div>
                </form>
        );
}

export default SignUp;