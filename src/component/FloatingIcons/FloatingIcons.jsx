import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaComments } from 'react-icons/fa';

const FloatingIcons = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed right-4 bottom-4 z-50 space-y-4 flex flex-col items-end">
      {/* Travel Match Icon */}
      <button
        onClick={() => navigate('/travel-match')}
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group relative"
        title="Find Travel Buddies"
      >
        <FaPlane className="text-xl" />
        <span className="absolute right-full mr-4 bg-primary text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Find Travel Buddies
        </span>
      </button>

      {/* Travel Chat Icon */}
      <button
        onClick={() => navigate('/travel-chat')}
        className="dark:bg-white/80 bg-black/50 dark:text-black text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group relative"
        title="Travel Chat"
      >
        <FaComments className="text-xl" />
        <span className="absolute right-full mr-4 bg-primary text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Travel Chat
        </span>
      </button>
    </div>
  );
};

export default FloatingIcons;
