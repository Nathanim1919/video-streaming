import React, { useState } from 'react';

const ChatSection = () => {
    const [message, setMessage] = useState('');
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
};

const handleSendMessage = () => {
    // Here you would typically send the message to your server
    console.log(message);
    setMessage('');
};

  return (
    <div>
      <h2>Chat</h2>
      <input type="text" value={message} onChange={handleInputChange} placeholder="Type your message here..." />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatSection;