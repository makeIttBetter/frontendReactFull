import React from 'react';

const Sidebar = () => {
  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">AiTripPlanner</div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">Chats</li>
          <li className="p-4 hover:bg-gray-700">Reports</li>
          <li className="p-4 hover:bg-gray-700">Settings</li>
          <li className="p-4 hover:bg-gray-700">Support and Guide</li>
        </ul>
      </nav>
      <div className="p-4 hover:bg-gray-700 cursor-pointer">Logout</div>
    </div>
  );
};

export default Sidebar;
