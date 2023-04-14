import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    socket.on('onlineUsers', (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', { author: username, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Web Chat</h1>
      <div>Online users: {onlineUsers}</div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
      <hr />
      {messages.map((message, index) => (
        <div key={index}>
          <b>{message.author}: </b>
          <span>{message.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Chat;
