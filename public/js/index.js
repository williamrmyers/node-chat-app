var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on(`newMessage`, (message) => {
  console.log(`recieved new message!`, message);
  let li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  $('#messages').append(li);
});


socket.emit('createMessage', {
  from: 'frank',
  text: 'HI!'
}, (data) => {
  console.log(`Message recieved from server.`, data);
});


$('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit(`createMessage`, {
    from: 'pinkfloyed',
    text: $('input')[0].value
  }, () => {
    $('input')[0].value = '';
  });
});

// socket.on('newEmail', (email) => {
//   console.log(`New Email!`, email);
// });
//
//
// socket.emit(`createEmail`, {
//   to: 'pinkfloyed@gmail.com',
//   message: `Hello! is anybody out there?`
// });
