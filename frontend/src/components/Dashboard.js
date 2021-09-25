import React, { useState, useEffect } from 'react';
import ProfileView from './ProfileView';

const Dashboard = () => {
  // State variable to store information
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      fetch('api/user')
        .then((res) => res.json())
        .then((data) => {
          if (!data.user) {
            document.getElementById('dashboard').innerText = data.error;
            return;
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
