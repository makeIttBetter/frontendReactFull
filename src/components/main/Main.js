import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ChatInput from './ChatInput';
import {sendChat, getChatHistory, storeChat} from 'api/ChatService';
import logo from 'assets/logo.png'; // Importer le logo
import styles from './Main.module.css';
import {getSessionList, deleteSession} from 'api/session';

const maxAttempts = 1;

function Main() {
  const [history, setHistory] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [newChatName, setNewChatName] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    // Fetch chat sessions from the backend
    const fetchChatSessions = async () => {
      try {
        const response = await getSessionList();
        if (response && response.data) {
          setChatSessions(response.data);
        } else {
          setChatSessions([]);
        }
      } catch (error) {
        console.error('Error fetching chat sessions:', error);
        setChatSessions([]);
      }
    };

    fetchChatSessions();
  }, []);

  const handleSendMessage = async (message) => {
    await sendMessage(message);
  };

  const sendMessage = async (message) => {
    const userMessage = { id: history.length, messageType: 'USER', content: message };
    setHistory((prevHistory) => [...prevHistory, userMessage]);
    let response;

    try {
      response = await sendChat(message, selectedSession.sessionId);
      const botResponse = { id: history.length, messageType: 'ASSISTANT', content: response.data };
      setHistory((prevHistory) => [...prevHistory, botResponse]);
    } catch (error) {
      console.error(`Error sending message:`, error);
    }

    // try {
    //   await storeChat(selectedSession.sessionId, message, 'USER');
    // } catch (error) {
    //   console.error(`Error storing user message:`, error);
    // }

    // try {
    //   await storeChat(selectedSession.sessionId, response.data, 'ASSISTANT');
    // } catch (error) {
    //   console.error(`Error storing Flomad message:`, error);
    // }
  };

  const handleCreateNewChat = () => {
    const newChat = `Chat ${chatSessions.length + 1}`;
    setNewChatName(newChat);
  };

  const getHistoryChat = async (sessionId, attempt = 0) => {
    if (attempt >= maxAttempts) {
      console.error('Max attempts reached. Could not retrieve chat history.');
      return null;
    }

    try {
      const response = await getChatHistory(sessionId);
      if (response.status === 200) {
        if (response.data) {
          return response.data;
        }
      } else {
        console.log('New session!');
        return null;
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1}: Error retrieving chat history`, error);
      // Retry retrieving chat history after a delay
      return new Promise((resolve) =>
        setTimeout(async () => resolve(await getHistoryChat(sessionId, attempt + 1)), 1000)
      );
    }
  };

  const handleSelectSession = async (session) => {
    setSelectedSession(session);
    // console.log('Selected session:', session);
    const chatHistory = await getHistoryChat(session.sessionId);
    // console.log('Chat history:', chatHistory);
    if (chatHistory) {
      setHistory(chatHistory);
    } else {
      setHistory([]);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await deleteSession(sessionId);

      if (response.status === 204) {
        console.log('Session deleted:', sessionId);
        setChatSessions((prevSessions) => prevSessions.filter(session => session.sessionId !== sessionId));
        if (selectedSession && selectedSession.sessionId === sessionId) {
          setSelectedSession(null);
          setHistory([]);
        }
      } else {
        console.log('Session fail:', sessionId);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        chatSessions={chatSessions} 
        onCreateNewChat={handleCreateNewChat} 
        onSelectSession={handleSelectSession}
        selectedSession={selectedSession}
        onDeleteSession={handleDeleteSession}
      />
      <div className={`${styles['main-container-outer']} flex-1 flex flex-col items-center p-6 ${history.length > 0 ? '' : 'justify-center'}`}>
        {/* {selectedSession && (
          <h2 className={`text-lg font-semibold mb-4 text-center`}>{selectedSession.title}</h2>
        )} */}
        <MainContent 
          onSendMessage={sendMessage}
          newChatName={newChatName} 
          setChatSessions={setChatSessions} 
          onSelectSession={handleSelectSession}
          history={history}
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};


export default Main;