import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  // State variable to store information
  const [user, setUser] = useState([]);
  // component should receive a validated user from the API. If there is no session, a person should not be able to view the dashboard and should be asked to signup.

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        if (!user) {
          document.getElementById('dashboard').innerText =
            'Not Authorized. Please sign in.';
        } else {
          setUser(data.user);
          document.getElementById('content').display = 'block';
        }
      });
  });
  return (
    <div id="dashboard">
      <div id="content" style={{ display: 'none' }}></div>
    </div>
  );
};

export default Dashboard;
