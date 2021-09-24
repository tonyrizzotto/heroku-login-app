import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css';

const Login = () => {
  // request Credentials from Google
  const requestCredentials = async (response) => {
    //prepare options to send back to API
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: response.tokenId,
      }),
    };

    //make the API call
    await fetch('/api/v1/auth/google', options)
      .then((res) => res.json())
      .then((data) => {
        if (data.created) {
          window.location.href = 'http://localhost:3000/dashboard';
        }
      });
  };
  return (
    <div id="wrapper">
      <div className="container">
        <div className="image-container"></div>
        <div className="form-container">
          <form>
            <div className="input">
              <input
                type="text"
                name="first-name"
                placeholder="Your First Name"
              />
            </div>
            <div className="input">
              <input
                type="text"
                name="last-name"
                placeholder="Your Last Name"
              />
            </div>
            <div className="input">
              <input type="email" name="email" placeholder="Your Email" />
            </div>
            <div className="input">
              <input
                type="password"
                name="password"
                placeholder="Enter a Password"
              />
            </div>

            <button type="submit">Submit</button>

            {/* Google Account Button */}
            <div>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign up with Google"
                onSuccess={requestCredentials}
                onFailure={requestCredentials}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
