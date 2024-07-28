import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ChatInput from './chat/ChatInput';
import {sendChat, getChatHistory, storeChat} from 'api/ChatService';
import styles from './Main.module.css';
import {getSessionList, deleteSession, createSession} from 'api/session';
import ThemeToggle from 'components/guards/ThemeToggle';
import UserIcon from './userIcon/UserIcon';

const maxAttempts = 3;

function Main() {
  const [history, setHistory] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [newChatName, setNewChatName] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // useEffect(() => {
  //   console.log('Chat sessions changed:', chatSessions);
  // }, [chatSessions]);

  useEffect(() => {
    const fetchChatSessions = async () => {
      // console.log('Fetching chat sessions...');
      try {
        const response = await getSessionList();
        if (response && response.data) {
          setChatSessions(response.data);
          if (response.data.length > 0) {
            handleSelectSession(response.data[0]);
          }
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

  useEffect(() => {
    // Scroll to the bottom of the chat when history updates
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleSendMessage = async (message, attempt = 0) => {
    if (attempt >= maxAttempts) {
      console.error('Max attempts reached. Could not send Message.');
      return null;
    }

    let session;
    // console.log('Selected session:', selectedSession);
    if (selectedSession === null) {
      session = await handleCreateNewChat();
    } else {
      session = selectedSession;
    }

    setLoading(true);
    try {
      await sendMessage(message, session);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message, session) => {
    console.log('Session:', session);
    console.log('SessionID:', session.sessionId);

    if (typeof session.sessionId === 'number') {
      session = await createNewSession(session.title);
      if (!session) {
        console.error('Failed to create a new session.');
        return;
      }
    }
    
    const userMessage = { id: history.length, messageType: 'USER', content: message };
    setHistory((prevHistory) => [...prevHistory, userMessage]);

    let response;

    try {
      response = await sendChat(message, session.sessionId);
      const botResponse = { id: history.length, messageType: 'ASSISTANT', content: response.data };
      setHistory((prevHistory) => [...prevHistory, botResponse]);
    } catch (error) {
      console.error(`Error sending message:`, error);
    }
  };

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
  // };

  const handleCreateNewChat = async (name) => {

    const newChat = name || `Chat ${chatSessions.length + 1}`;
    const newSession = { sessionId: chatSessions.length, title: newChat };
    setChatSessions((prevSessions) => [newSession, ...prevSessions]);
    setSelectedSession(newSession);
    setHistory([]);

    if (newChat === 'Chat') {
      try {
        const response = await createSession(newChatName);
        if (response.status === 200) {
          const newSession = response.data;
          setChatSessions((prevSessions) => [newSession, ...prevSessions]);
          setSelectedSession(newSession);
          setHistory([]);
          console.log(selectedSession);
          // console.log('Chat List:', chatSessions);
        } else {
          console.error('Error creating chat:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }

    return newSession;
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

  const createNewSession = async (name) => {
    try {
      const response = await createSession(name);
      if (response.status === 200 && response.data) {
        console.log('Chat created:', response.data);
        setChatSessions((prevSessions) => [response.data, ...prevSessions.filter(session => typeof session.sessionId !== 'number')]);
        setSelectedSession(response.data);
        setHistory([]);
        return response.data;
        // console.log('Chat created:', response.data);
      } else {
        console.error('Error creating chat:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
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
        <div className={styles.themeToggle}>
          <ThemeToggle className='scale-75'/>
          <UserIcon />
        </div>
        <MainContent 
          onSendMessage={handleSendMessage}
          history={history}
          loading={loading}
        />
        <div ref={bottomRef} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};


export default Main;