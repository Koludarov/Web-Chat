import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000/chat');

const Chat = ({ username, active_users }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', ({ msg }) => {
      setChat([...chat, msg]);
    });

    socket.on('status', ({ msg }) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  const sendMessage = e => {
    e.preventDefault();
    socket.emit('text', { msg: message });
    setMessage('');
  };

  return (
    <div>
      <h1>Welcome to the chat, {username}!</h1>
      <h2>Online users: {active_users ? active_users.length : 0}</h2>

      <div>
        {chat.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
