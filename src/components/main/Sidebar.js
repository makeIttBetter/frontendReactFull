import React, { useState, useRef } from 'react';
import { useAuth } from "components/guards/AuthContext";
import swal from 'sweetalert';

const Sidebar = ({ onCreateNewChat, onSelectSession, onDeleteSession, onUpdateSession ,selectedSession, chatSessions }) => {
  const { signOut } = useAuth();
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

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
    <div className="h-full bg-gray-900 text-white flex flex-col w-[12%]">
      <div className="p-4 text-xl font-bold">AiTripPlanner</div>
      <nav className="flex-1" style={{ maxHeight: '100%', overflowY: 'auto' }}>
        <button
          onClick={() => onCreateNewChat(null)}
          className="w-full text-left p-2 hover:bg-gray-600"
        >
          + New Chat
        </button>
        <ul className="ml-4 mt-2">
          {chatSessions.map(session => (
            <li 
              key={session.sessionId} 
              className={`p-2 hover:bg-gray-700 cursor-pointer flex justify-between items-center ${selectedSession && selectedSession.sessionId === session.sessionId ? 'bg-gray-600' : ''}`}
              onClick={() => onSelectSession(session)}
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
                  className="bg-gray-700 p-1 text-white w-full"
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => handleEditTitle(session.sessionId, session.title)}>{session.title}</span>
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
                className="ml-2 text-red-600 transform hover:scale-125 transition duration-200"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        {/* <li className="p-4 hover:bg-gray-700 cursor-pointer">Reports</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Support and Guide</li> */}
      </nav>
      <div 
        className="p-4 hover:bg-gray-700 cursor-pointer"
        onClick={signOut}
      >Logout</div>
    </div>
  );
};

export default Sidebar;
