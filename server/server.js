const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));






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

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });


    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
