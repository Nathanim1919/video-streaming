import React from 'react';

const UserProfile = () => {
  return (
    <div>
      <h2>Username</h2>
      <img src="profile.jpg" alt="Profile" />
      <p>Bio: This is a short bio about the user.</p>
      <button>Follow</button>
    </div>
  );
};

export default UserProfile;