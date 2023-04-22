import "./Terms.css";

function PrivacyPopup() {

  return (
        <div className="Container_Privacy" id="privacy">
                <a href="/"> Click her to go back to home</a>
                <p>
                        In 2023, online privacy standards have become more important than
                        ever. <br></br>With the rise of data breaches and cyber attacks, it's
                        essential to protect your personal information online.
                </p>
                <p>Here are some tips for staying safe:</p>
                <ul>
                <li>Use strong and unique passwords for each of your online accounts</li>
                <li>Enable two-factor authentication whenever possible</li>
                <li>
                Be cautious of phishing emails and always verify the sender and
                the contents of the email
                </li>
                <li>
                Use a VPN to encrypt your internet connection and protect your
                privacy
                </li>
                <li>
                Regularly review and update your privacy settings on social media
                and other online platforms
                </li>
                </ul>
                <p>
                By following these best practices, you can help ensure that your
                personal information remains secure online.
                </p>
          </div>
  );
}

export default PrivacyPopup;
