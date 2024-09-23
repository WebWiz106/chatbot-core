import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatWidget from './ChatWidget';  // Import the ChatWidget
import reportWebVitals from './reportWebVitals';

// Function to load the chat widget script
(function() {
  const widgetScript = document.createElement('script');
  widgetScript.src = "http://localhost:3000/chat-widget.js"; // URL to the chat widget script
  document.body.appendChild(widgetScript);

  widgetScript.onload = function() {
    console.log("Chat widget script loaded successfully");
    if (typeof window.renderChatWidget === 'function') {
      window.renderChatWidget({
        position: 'bottom-right',
        themeColor: '#3498db'
      });
    } else {
      console.error('renderChatWidget function is not available.');
    }
  };
})();

// Render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Set up the renderChatWidget function globally
window.renderChatWidget = (config) => {
  const container = document.createElement('div');
  container.id = 'chat-widget-container';
  document.body.appendChild(container);

  const chatRoot = ReactDOM.createRoot(document.getElementById('chat-widget-container'));

  chatRoot.render(
    <React.StrictMode>
      <ChatWidget {...config} />
    </React.StrictMode>
  );
};

reportWebVitals();
