import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaStar } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [conversationStep, setConversationStep] = useState('greeting');
  const messagesEndRef = useRef(null);

  const predefinedQuestions = [
    {
      question: "What services do you offer?",
      answer: "We offer various fitness services including personal training, group classes, yoga, and nutrition counseling. You can also access our mindfulness library and travel buddy matching service.",
      followUp: "Would you like to know more about any specific service?"
    },
    {
      question: "How can I book a class?",
      answer: "You can book a class through our website by navigating to the Fitness section and selecting your preferred class. You'll need to be logged in to make a booking.",
      followUp: "Would you like help with the booking process?"
    },
    {
      question: "What are your membership plans?",
      answer: "We offer several membership plans including Coders-Gym Pass, Coders-Gym Transform, and Coders-Gym Elite. Each plan comes with different benefits and durations.",
      followUp: "Would you like to know the details of any specific plan?"
    },
    {
      question: "How do I find a travel buddy?",
      answer: "You can use our Travel Match feature to find travel buddies. Simply go to the Travel Match section, set your preferences, and we'll help you connect with like-minded travelers.",
      followUp: "Would you like to know more about the Travel Match feature?"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && conversationStep === 'greeting') {
      // Initial greeting
      setTimeout(() => {
        const greeting = {
          type: 'bot',
          content: "Hello! Welcome to Coders Gym. I'm your virtual assistant. How may I help you today?",
          time: new Date().toLocaleTimeString(),
        };
        setMessages([greeting]);
        setShowOptions(true);
        setConversationStep('options');
      }, 500);
    }
  }, [isOpen, conversationStep]);

  const handleQuestionClick = (question) => {
    // Add user message
    const newMessage = {
      type: 'user',
      content: question,
      time: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, newMessage]);
    setShowOptions(false);
    setConversationStep('answering');

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const matchingQuestion = predefinedQuestions.find(
        q => q.question.toLowerCase() === question.toLowerCase()
      );

      const botResponse = {
        type: 'bot',
        content: matchingQuestion.answer,
        time: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botResponse]);

      // Show follow-up question after a delay
      setTimeout(() => {
        const followUp = {
          type: 'bot',
          content: matchingQuestion.followUp,
          time: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, followUp]);
        setShowOptions(true);
        setConversationStep('followUp');
      }, 1500);
    }, 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage = {
      type: 'user',
      content: inputMessage,
      time: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setShowOptions(false);
    setConversationStep('answering');

    // Simulate bot response
    setTimeout(() => {
      const matchingQuestion = predefinedQuestions.find(
        q => q.question.toLowerCase() === inputMessage.toLowerCase()
      );

      const botResponse = {
        type: 'bot',
        content: matchingQuestion
          ? matchingQuestion.answer
          : "I'm sorry, I don't understand that question. Please try asking about our services, booking classes, membership plans, or travel buddy matching.",
        time: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botResponse]);

      // Show follow-up or options
      setTimeout(() => {
        if (matchingQuestion) {
          const followUp = {
            type: 'bot',
            content: matchingQuestion.followUp,
            time: new Date().toLocaleTimeString(),
          };
          setMessages(prev => [...prev, followUp]);
          setShowOptions(true);
          setConversationStep('followUp');
        } else {
          setShowOptions(true);
          setConversationStep('options');
        }
      }, 1500);
    }, 2000);
  };

  const handleRating = (rating) => {
    const ratingMessage = {
      type: 'user',
      content: `Rating: ${rating} stars`,
      time: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, ratingMessage]);
    setShowRating(false);

    // Final thank you message
    setTimeout(() => {
      const thankYou = {
        type: 'bot',
        content: "Thank you for your feedback! Let me know if you need any further assistance. Have a great day!",
        time: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, thankYou]);
      setShowOptions(false);
      setConversationStep('ended');
    }, 1000);
  };

  const handleEndConversation = () => {
    const endMessage = {
      type: 'bot',
      content: "Thank you for chatting with me! Before you go, would you like to rate our conversation?",
      time: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, endMessage]);
    setShowOptions(false);
    setShowRating(true);
    setConversationStep('rating');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 ${isOpen ? 'hidden' : 'block'
          }`}
      >
        <FaRobot className="text-3xl" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-dark rounded-lg shadow-xl w-[50vw] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[80vh] sm:h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg relative flex items-center justify-center">
            {/* Centered Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <FaRobot className="text-2xl" />
              <h3 className="font-serif text-lg">Coders Gym Assistant</h3>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto hover:bg-white/20 p-2 rounded-full transition-colors z-10"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>


          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white'
                    }`}
                >
                  <p className="text-base">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}

            {showOptions && (
              <div className="space-y-2">
                {predefinedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(q.question)}
                    className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-white"
                  >
                    {q.question}
                  </button>
                ))}
                <button
                  onClick={handleEndConversation}
                  className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-white"
                >
                  End conversation
                </button>
              </div>
            )}

            {showRating && (
              <div className="flex justify-center space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-yellow-400 hover:text-yellow-500 transition-colors transform hover:scale-110"
                  >
                    <FaStar className="text-3xl" />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          {conversationStep !== 'ended' && (
            <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-lg border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-base"
                />
                <button
                  type="submit"
                  className="bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <FaPaperPlane className="text-xl" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot; 