const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'bort@test.com',
  //   subject: 'My Wife',
  //   createdAt: 12324
  // });
  //
  // socket.on('createEmail', (newEmail) => {
  //   console.log(`createEmail`, newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log(`Message Created`, message);
  });

  socket.emit(`newMessage`, {
    from: 'Jeff',
    text: 'this is a message!',
    createdAt: 11234567890
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
