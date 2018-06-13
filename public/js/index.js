var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
  //Listens for newMessage event, then renders a new message to the screen with jQuery.
socket.on(`newMessage`, (message) => {
  console.log(`recieved new message!`, message);
  let li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  $('#messages').append(li);
});


socket.on('newLocationMessage', (message) => {
  let li = $('<li></li>');
  let a = $('<a target="_blank" >My Current Location</a>');

  li.text(`${message.from} :`);
  a.attr('href', message.url);
  li.append(a);

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



let locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    /* geolocation IS NOT available */
    return alert(`Geolocation not supported by your browser.`);
  } else {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      socket.emit('currentLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, (e) => {
      console.log(`Unable to fetch location.`);
    });
  }
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
