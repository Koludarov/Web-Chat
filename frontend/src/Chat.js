import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message';
import SendMessage from './SendMessage';
import UsersOnline from './UsersOnline';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [usersOnline, setUsersOnline] = useState(0);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('usersOnline', (count) => {
      setUsersOnline(count);
    });

    socket.on('userLeft', (count) => {
      setUsersOnline(count);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('usersOnline');
      socket.off('userLeft');
    };
  }, []);

  const handleSendMessage = (message) => {
    const messageObject = {
      username: username,
      message: message,
    };

    socket.emit('message', messageObject);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="chat">
      <div className="header">
        <h1>Web Chat</h1>
        <UsersOnline count={usersOnline} />
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            message={message.message}
          />
        ))}
      </div>
      {username ? (
        <SendMessage
          sendMessage={handleSendMessage}
        />
      ) : (
        <div className="username-container">
          <h2>Enter a username to join the chat</h2>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            maxLength={15}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
