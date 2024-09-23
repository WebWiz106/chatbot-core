// src/ChatWidget.js

import React, { useState } from 'react';
import './ChatWidget.css'; // Optional CSS file for styling

const ChatWidget = ({ position = 'bottom-right', themeColor = '#3498db' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (message) => {
    if (!message) return;

    setMessages([...messages, { text: message, sender: 'user' }]);
    setInputValue("");

    // Mock bot response, in real application, make API call here
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "This is a response from the bot!", sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-widget" style={{ position: 'fixed', [position]: '20px' }}>
      <button className="chat-toggle-btn" onClick={toggleChat} style={{ backgroundColor: themeColor }}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage(inputValue);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
