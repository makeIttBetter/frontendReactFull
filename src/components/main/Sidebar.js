import React from 'react';
import { useAuth } from "components/guards/AuthContext";

const Sidebar = ({ chatSessions, onCreateNewChat, onSelectSession, selectedSession, onDeleteSession }) => {
  const { signOut } = useAuth();

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
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
              <span>{session.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.sessionId);
                }}
                className="ml-2 text-red-600 hover:text-red-800"
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
