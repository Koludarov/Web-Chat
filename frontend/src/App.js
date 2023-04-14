import React, { useState } from 'react';
import Chat from './Chat';

const App = () => {
  const [username, setUsername] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);

  const handleFormSubmit = e => {
    e.preventDefault();
    setActiveUsers([...activeUsers, username]);
  };

  return (
    <div>
      {username ? (
        <Chat username={username} activeUsers={activeUsers} />
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <button type="submit">Join Chat</button>
        </form>
      )}
    </div>
  );
};

export default App;
