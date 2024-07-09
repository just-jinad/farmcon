import React from 'react';
import SideBar from '../pages/SideBar';

const UserProfile = ({ user, onEdit }) => {
  return (
    <>
    <SideBar/>
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
    </>
  );
};

export default UserProfile;
