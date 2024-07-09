// src/Chat.js
import React, { useState } from 'react';
import ChatService from './ChatService';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { sender: 'user', text: message };
    const updatedConversation = [...conversation, newMessage];
    setConversation(updatedConversation);

    try {
      const res = await ChatService.sendMessage(message);
      const botResponse = { sender: 'bot', text: res.data };
      setConversation([...updatedConversation, botResponse]);
      setHistory([{ question: message, answer: res.data }, ...history]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        <h2>History</h2>
        {history.map((item, index) => (
          <div key={index}>
            <p><strong>Q:</strong> {item.question}</p>
            <p><strong>A:</strong> {item.answer}</p>
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-messages">
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
