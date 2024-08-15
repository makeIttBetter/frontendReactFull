import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ChatInput from './chat/ChatInput';
import {sendChat, getChatHistory } from 'api/ChatService';
import styles from './Main.module.css';
import {getSessionList, deleteSession, createSession, updateSession} from 'api/session';
import ThemeToggle from 'components/guards/ThemeToggle';
import UserIcon from './userIcon/UserIcon';

const maxAttempts = 3;

function Main() {
  const [history, setHistory] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // useEffect(() => {
  //   console.log('Chat sessions changed:', chatSessions);
  // }, [chatSessions]);

  // fetch chat sessions on component mount
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

  // Scroll to the bottom of the chat when history updates
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);
  
  /**
   * Creating a new chat session and remove the previous fake session.
   * 
   * @param {string} name - The name of the chat session to be created 
   * @returns {} The new chat session, or null if the session could not be created
   */
  const createNewSession = async (name) => {
    try {
      const response = await createSession(name);
      if (response.status === 200 && response.data) {
        // console.log('Chat created:', response.data);
        setChatSessions((prevSessions) => [
          response.data, ...prevSessions.filter(session => 
            selectedSession === null 
              ? typeof session.sessionId !== 'number' 
              : session.sessionId !== selectedSession.sessionId
          )
        ]);
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

  /**
   * Handle creating a new fake chat session and set state.
   * 
   * @param {string} name - The name of the chat session to be created 
   * @returns {} The fake chat session, or real new session if Not VIP
   */
  const handleCreateNewChat = async (name) => {

    const newChat = name || `Chat ${chatSessions.length + 1}`;
    const newSession = { sessionId: chatSessions.length, title: newChat };
    setChatSessions((prevSessions) => [newSession, ...prevSessions]);
    setSelectedSession(newSession);
    setHistory([]);

    if (newChat === 'Chat') {
      try {
        const response = await createSession(newChat);
        if (response.status === 200) {
          newSession = response.data;
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

  /**
   * Handle creating a new chat session and set state for non-VIP users.
   */
  const handleNonVipCreateNewChat = async () => {
    if (chatSessions.length > 0) {
      const deletePromises = chatSessions.map(session => handleDeleteSession(session.sessionId));
      await Promise.all(deletePromises);
    }
    // console.log('create new Chat');
    await handleCreateNewChat('Chat');
  };

  /**
   * Handle sending a message to the chatbot and updating the chat history.
   * If the selected session is null, a new chat session is created.
   * 
   * @param {string} message - The message to be sent 
   * @param {number} attempt - The number of attempts made to send the message 
   * @returns 
   */
  const handleSendMessage = async (message, attempt = 0) => {
    if (attempt >= maxAttempts) {
      console.error('Max attempts reached. Could not send Message.');
      return;
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

  /**
   * Send a message to the chatbot and update the chat history.
   * If the session ID is a number, a new chat session is created and replace the fake one.
   * 
   * @param {string} message - The message to be sent 
   * @param {Object} session - The chat session to send the message to 
   * @returns 
   */
  const sendMessage = async (message, session) => {
    // console.log('Session:', session);
    // console.log('SessionID:', session.sessionId);

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
      if (session.sessionId === (selectedSession ? selectedSession.sessionId : null)) {
        const botResponse = { id: history.length, messageType: 'ASSISTANT', content: response.data };
        setHistory((prevHistory) => [...prevHistory, botResponse]);
      }
    } catch (error) {
      console.error(`Error sending message:`, error);
    }
  };

  /**
   * Handle deleting a chat session and its chat history.
   * 
   * @param {string} sessionId - The ID of the chat session to be deleted
   */
  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await deleteSession(sessionId);

      if (response.status === 204) {
        // console.log('Session deleted:', sessionId);
        setChatSessions((prevSessions) => prevSessions.filter(session => session.sessionId !== sessionId));
        if (selectedSession && selectedSession.sessionId === sessionId) {
          handleSelectSession(chatSessions[1] || null);
        }
      } else {
        console.log('Session fail:', sessionId);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };


  const handleUpdateSession = async (sessionId, title) => {
    try {
      const response = await updateSession(sessionId, title);
      if (response.status === 200) {
        console.log('Session updated:', response.data);
        setChatSessions((prevSessions) => prevSessions.map(session => 
          session.sessionId === sessionId ? response.data : session
        ));
      } else {
        console.error('Error updating session:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  /**
   * Select a chat session and load its chat history.
   * 
   * @param {Object|null} session - The chat session to be selected, or null to clear selection.
   */
  const handleSelectSession = async (session) => {
    if (session) {
      setSelectedSession(session);
      const chatHistory = await getHistoryChat(session.sessionId);
      setHistory(chatHistory);
    } else {
      setSelectedSession(null);
      setHistory([]);
    }
  };

  /**
   * Get chat history for a chat session.
   * 
   * @param {string} sessionId - The ID of the chat session to retrieve chat history for
   * @param {number} attempt - The number of attempts made to retrieve chat history 
   * @returns {} The chat history for the session, or null if the history could not be retrieved
   */
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

  return (
    <div className="flex h-screen">
      <Sidebar 
        chatSessions={chatSessions} 
        onCreateNewChat={handleCreateNewChat} 
        onSelectSession={handleSelectSession}
        selectedSession={selectedSession}
        onDeleteSession={handleDeleteSession}
        onUpdateSession={handleUpdateSession}
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