import React, { useState, useEffect } from 'react';
import './ChatWidget.css'; // Optional CSS file for styling
import { TbMessageChatbot } from "react-icons/tb";
import { TbSend } from "react-icons/tb";

const ChatWidget = ({ position = 'bottom-right', themeColor = '#3498db' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Effect to set the initial bot message
  useEffect(() => {
    setMessages([{ text: "How can I assist you?", sender: 'bot' }]);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (message) => {
    if (!message) return;

    setMessages([...messages, { text: message, sender: 'user' }]);
    setInputValue("");

    // Mock bot response
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
        <TbMessageChatbot style={{ fontSize: '2em', transition: 'transform 0.3s' }} />
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
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(inputValue);
              }}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(inputValue)}
            >
              <TbSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
