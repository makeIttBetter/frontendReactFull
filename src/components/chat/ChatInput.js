import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input flex p-4 bg-white shadow-md w-full max-w-2xl">
      <input
        type="text"
        className="flex-1 p-2 border rounded"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
