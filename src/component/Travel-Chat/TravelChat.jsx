
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Inline axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/chat/profiles/',
  withCredentials: true,
});

const TravelChat = () => {
  const { userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMatches = async () => {
      try {
        const response = await api.get('profiles/');
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedMatch) return;
      try {
        const response = await api.get(`chat/${selectedMatch.user.id}/`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedMatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMatch) return;

    try {
      const response = await api.post(`chat/${selectedMatch.user.id}/`, {
        text: newMessage,
      });

      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen bg-white dark:bg-black pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif text-black/90 dark:text-white">
            Travel's<span className="text-primary"> Buddy</span> Chat
          </h1>
          <button
            onClick={() => navigate('/travel-match')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            <FaArrowLeft />
            Back to Search
          </button>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No travel matches found yet. Try searching for travel buddies!
            </p>
            <button
              onClick={() => navigate('/travel-match')}
              className="mt-4 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Find Travel Buddies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Matches List */}
            <div className="md:col-span-1 bg-white dark:bg-dark/90 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Your Matches</h2>
              <div className="space-y-4">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedMatch?.id === match.id
                        ? 'bg-primary/10 dark:bg-primary/20'
                        : 'hover:bg-gray-100 dark:hover:bg-dark/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FaUser className="text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {match.user.username}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Traveling to {match.travel_location}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(match.travel_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-3 bg-white dark:bg-dark/90 rounded-lg shadow-lg">
              {selectedMatch ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FaUser className="text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {selectedMatch.user.username}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedMatch.age} years old • {selectedMatch.travel_location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-[400px] overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender.id === userProfile.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender.id === userProfile.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg border dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark/50 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Select a match to start chatting
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelChat;
