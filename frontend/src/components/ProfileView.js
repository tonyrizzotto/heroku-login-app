import React from 'react';
import './ProfileView.css';

const ProfileView = (props) => {
  console.log(props);
  return (
    <div className="card">
      <div className="left-side">
        <div className="profile-image">
          <img
            src={
              !props.user.imageUrl
                ? `https://fakeimg.pl/96x96/?text=Your Image!`
                : props.user.imageUrl
            }
            alt={props.user.firstName}
          />
        </div>
      </div>
      <div className="right-side">
        <div className="title">
          <h1>
            {props.user.firstName} {props.user.lastName}
          </h1>
        </div>
        <div className="user-desc">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="user-email">
          <b>Contact:</b> {props.user.email}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
