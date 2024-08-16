import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "components/guards/AuthContext";
import swal from 'sweetalert';


const Sidebar = ({ onCreateNewChat, onSelectSession, onDeleteSession, onUpdateSession, selectedSession, chatSessions }) => {
  const { signOut } = useAuth();
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEditTitle = (sessionId, title) => {
    if (typeof sessionId !== 'number') {
      setEditingSessionId(sessionId);
      setNewTitle(title);
    }
  };

  const handleUpdateTitle = (sessionId, originalTitle) => {
    if (newTitle.trim() && newTitle !== originalTitle) {
      onUpdateSession(sessionId, newTitle);
    }
    setEditingSessionId(null);
    setNewTitle('');
  };

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#1a202c', // gray-900
        color: '#ffffff', // white
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? '100%' : '12%',
        maxWidth: isMobile ? '20%' : '200px',
      }}
    >
      <div
        style={{
          padding: '1rem',
          fontSize: isMobile ? '0.5rem' : '1rem',
          fontWeight: 'bold',
        }}
      >
        AiTripPlanner
      </div>
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <button
          onClick={() => onCreateNewChat(null)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '0.5rem',
            backgroundColor: isMobile ? '#2d3748' : '#4a5568', // gray-600
            color: '#ffffff', // white
          }}
        >
          + New Chat
        </button>
        <ul style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
          {chatSessions.map(session => (
            <li
              key={session.sessionId}
              onClick={() => onSelectSession(session)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: selectedSession && selectedSession.sessionId === session.sessionId ? '#2d3748' : '', // gray-600
                borderRadius: '4px',
                marginBottom: '0.5rem',
              }}
            >
              {editingSessionId === session.sessionId ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => handleUpdateTitle(session.sessionId, session.title)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateTitle(session.sessionId, session.title);
                    }
                  }}
                  style={{
                    backgroundColor: '#2d3748', // gray-700
                    padding: '0.25rem',
                    color: '#ffffff', // white
                    width: '100%',
                  }}
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => handleEditTitle(session.sessionId, session.title)}>
                  {session.title}
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  swal({
                    title: "Are you sure?",
                    text: "Once deleted, you can't recover this Conversation!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      e.stopPropagation();
                      onDeleteSession(session.sessionId);
                      swal("Your Conversation has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your Conversation is safe!");
                    }
                  });
                }}
                style={{
                  marginLeft: '0.5rem',
                  color: '#f56565', // red-600
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div
        onClick={signOut}
        style={{
          padding: '1rem',
          cursor: 'pointer',
          backgroundColor: isMobile ? '#2d3748' : '#4a5568', // gray-700
          color: '#ffffff', // white
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
