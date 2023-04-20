import "./Container.css";

function Reset() {
        return (
                <form>
                        <div className="User_forms">
                                <div className="User_forms-User_forms">
                                        <label>User Email</label>
                                        <input type="email" name="" placeholder="Enter email address"/>
                                </div>
                                <div className="User_form-User_Submission">
                                        <div className="User_form-User_Agree">
                                                <input className="User_form-btn" type="submit" name="" value="Login" />
                                        </div>
                                </div>
                        </div>
                </form>
        );
}

export default Reset;