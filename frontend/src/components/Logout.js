import React from 'react';

const Logout = () => {
  fetch('/api/logout')
    .then((res) => res.json())
    .then((data) => console.log(data));
  return (
    <div
      onLoad={setTimeout(() => {
        window.location.href = '/';
      }, 500)}
    >
      Logout
    </div>
  );
};

export default Logout;
