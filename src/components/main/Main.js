import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ChatInput from './ChatInput';
import {sendChat, getChatHistory, storeChat} from 'api/ChatService';
import logo from 'assets/logo.png'; // Importer le logo
import styles from './Main.module.css';
import {getSessionList, deleteSession, createSession} from 'api/session';
import ThemeToggle from 'components/guards/ThemeToggle';

const maxAttempts = 2;

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
          handleSelectSession(response.data[0]);
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

  const handleSendMessage = async (message, attempt = 0) => {
    if (attempt >= maxAttempts) {
      console.error('Max attempts reached. Could not send Message.');
      return null;
    }
    // console.log('Selected session:', selectedSession);
    if (selectedSession === null) {
      console.error('No session selected');
      return new Promise((resolve) =>
        setTimeout(async () => resolve(await handleSendMessage(message, attempt + 1)), 1000)
      );
    } else {
      await sendMessage(message);
    }
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

  const handleCreateNewChat = async (name) => {

    const newChat = name || `Chat ${chatSessions.length + 1}`;
    setNewChatName(newChat);

    if (newChatName === 'Chat') {
      try {
        const response = await createSession(newChatName);
        if (response.status === 200) {
          const newSession = response.data;
          setChatSessions((prevSessions) => [...prevSessions, newSession]);
          setSelectedSession(newSession);
          setHistory([]);
          console.log('Chat created:', response.data);
        } else {
          console.error('Error creating chat:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  };

  const handleNonVipCreateNewChat = async () => {
    if (chatSessions.length > 0) {
      const deletePromises = chatSessions.map(session => handleDeleteSession(session.sessionId));
      await Promise.all(deletePromises);
    }
    // console.log('create new Chat');
    await handleCreateNewChat('Chat');
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
    setHistory(chatHistory);
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
        onCreateNewChat={handleNonVipCreateNewChat} 
        onSelectSession={handleSelectSession}
        selectedSession={selectedSession}
        onDeleteSession={handleDeleteSession}
      />
      <div className={`${styles['main-container-outer']} flex-1 flex flex-col items-center p-6 ${history.length > 0 ? '' : 'justify-center'}`}>
        <div className={styles.themeToggle}>
          <ThemeToggle/>
        </div>
        <MainContent 
          onSendMessage={handleSendMessage}
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