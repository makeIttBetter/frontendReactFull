import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ChatInput from 'components/chat/ChatInput';
import ChatService from 'api/ChatService';
import logo from 'assests/logo.png'; // Importer le logo
import 'index.css';

function Main() {
  const [history, setHistory] = useState([]);
  const [showPrompts, setShowPrompts] = useState(true);

  const handlePromptClick = async (prompt) => {
    setShowPrompts(false);
    await sendMessage(prompt);
  };

  const handleSendMessage = async (message) => {
    setShowPrompts(false); // Hide prompts when a message is sent
    await sendMessage(message);
  };

  const sendMessage = async (message) => {
    const userMessage = { sender: 'user', text: message };
    // Ajoutez la question une seule fois à l'historique ici
    setHistory((prevHistory) => [...prevHistory, userMessage]);

    try {
      const response = await ChatService.sendMessage(message);
      const botResponse = { sender: 'bot', text: response.data };
      // Ajoutez la réponse du bot à l'historique
      setHistory((prevHistory) => [...prevHistory, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {showPrompts ? (
          <MainContent onPromptClick={handlePromptClick} />
        ) : (
          <>
            <div className="chat-header flex items-center mb-4">
              <img src={logo} alt="Flomad Logo" className="h-8 mr-2" />
              <h1 className="text-2xl font-bold">Flomad</h1>
            </div>
            <div className="chat-history bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
              <h2 className="text-lg font-semibold mb-4 text-center">Chat History</h2>
              {history.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <p><strong>{msg.sender === 'user' ? 'You' : 'Flomad'}:</strong> {msg.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}


export default Main;