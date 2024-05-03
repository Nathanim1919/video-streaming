import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Here you would typically send the username and password to your server
    console.log(username, password);
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;