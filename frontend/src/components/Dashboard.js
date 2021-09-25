import React, { useState, useEffect } from 'react';
import ProfileView from './ProfileView';

const Dashboard = () => {
  // State variable to store information
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      await fetch('api/user')
        .then((res) => res.json())
        .then((data) => {
          if (!data.user) {
            console.log(data);
            document.getElementById(
              'dashboard'
            ).innerHTML = `<h2>${data.error}</h2>`;
          } else {
            setUser(data.user);
            document.getElementById('content').style.display = 'block';
          }
        });
    };
    getUser();
  }, []);
  return (
    <div id="dashboard">
      <div id="content" style={{ display: 'none' }}>
        <ProfileView user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
