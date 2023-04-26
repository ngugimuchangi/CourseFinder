import "./Terms.css";
import Button from "react-bootstrap/esm/Button";

function Terms() {

  return (
        <div className="Container_Privacy" id="terms">
                <h1>Terms & Policy</h1>
                <br></br>
                Welcome to our online platform! By accessing or using<br></br> 
                our website, you agree to the following terms and conditions:

                <h3>User Conduct</h3>

                You agree to use our website for lawful purposes only and 
                not to engage in <br></br>any activity that may harm, disrupt, <br></br>or interfere 
                with the functioning of our website or the experience of other users.<br></br> 
                You may not use our website to post, transmit, or distribute <br></br>any content 
                that is unlawful, obscene, defamatory, or <br></br>infringing of intellectual property rights.

                <h3>User Content</h3>

                By posting, uploading, or submitting any content to our website,<br></br> 
                you grant us a non-exclusive, transferable, royalty-free, and worldwide<br></br> 
                license to use, modify, reproduce, distribute, and display the content in connection 
                <br></br>with our website and our business. You represent and warrant that you have 
                <br></br>all necessary rights and permissions to grant us this license.

                <Button onClick={() => window.location.href = "/"}>Go to home page</Button>
        </div>
  );
}

export default Terms;
