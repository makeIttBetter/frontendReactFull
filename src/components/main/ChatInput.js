import React, { useState } from 'react';
import styles from './Chat.module.css';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
      setMessage('');
    }
  };

  return (
    <div className={`flex p-4 bg-white shadow-md w-full max-w-2xl ${styles['chat-input']}` }>
      <input
        type="text"
        className={`flex-1 p-2 border rounded`}
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button className={`ml-2 p-2 bg-blue-500 text-white rounded`} onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
