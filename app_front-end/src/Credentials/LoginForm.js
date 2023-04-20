import "./Container.css";

function Login() {
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
                                        <div className="User_form-User_Agree Rester">
                                                <div className="Cont">
                                                        <input type="checkbox" name="" value="" />
                                                        <label>Remember</label>
                                                </div>
                                                <a className="Resets" href="/reset">Reset password</a>
                                        </div>
                                        <input type="submit" name="" value="Login" />
                                </div>
                        </div>
                </form>
        );
}

export default Login;