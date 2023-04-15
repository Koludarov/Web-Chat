const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3001;

const users = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    if (users[socket.username]) {
      delete users[socket.username];
      io.emit('updateUsers', Object.keys(users));
    }
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { username: socket.username, message: msg });
  });

  socket.on('new user', (username) => {
    socket.username = username;
    users[username] = socket.id;
    io.emit('updateUsers', Object.keys(users));
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
