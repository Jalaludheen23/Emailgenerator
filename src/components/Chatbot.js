import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = () => {
    if (userMessage.trim() !== '') {
      const newMessages = [...messages, { sender: 'user', text: userMessage }];

      // Simulating a chatbot response
      const botResponse = `You said: ${userMessage}`;
      newMessages.push({ sender: 'bot', text: botResponse });

      setMessages(newMessages);
      setUserMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#007bff' : '#e0e0e0',
              color: msg.sender === 'user' ? '#fff' : '#000',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          style={styles.input}
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button style={styles.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    padding: '10px 15px',
    margin: '5px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Chatbot;
