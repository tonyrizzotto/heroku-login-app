import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css';

const Login = () => {
  // Initilize state variables for form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Send user input data to API
  const handleSubmit = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    };

    await fetch('/api/user', options)
      .then((res) => res.json())
      .then((data) => {
        if (data.created) {
          window.location.href = 'http://localhost:3000/dashboard';
        }
      });
  };

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
          window.location.href = '/dashboard';
        }
      });
  };
  return (
    <div id="wrapper">
      <div className="container">
        <div className="image-container"></div>
        <div className="form-container">
          <h2>Registration</h2>
          <form id="form">
            <div className="input">
              <input
                type="text"
                name="first-name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Your First Name"
              />
            </div>
            <div className="input">
              <input
                type="text"
                name="last-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Your Last Name"
              />
            </div>
            <div className="input">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Your Email"
              />
            </div>
            <div className="input">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter a Password"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                //reset state after submission
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
              }}
            >
              Submit
            </button>

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
