var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

//Listens for newMessage event, then renders a new message to the screen with jQuery.

socket.on(`newMessage`, (message) => {
  let formattedTimeStamp = moment(message.createdAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTimeStamp
  });

  $('#messages').append(html);


  // console.log(`recieved new message!`, message);
  // let li = $('<li></li>');
  // li.text(`${message.from} ${formattedTimeStamp} : ${message.text}`);
  //
  // $('#messages').append(li);
});


socket.on('newLocationMessage', (message) => {
  let formattedTimeStamp = moment(message.createdAt).format('h:mm a');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTimeStamp
  });

  $('#messages').append(html);

  // let li = $('<li></li>');
  // let a = $('<a target="_blank" >My Current Location</a>');
  // let formattedTimeStamp = moment(message.createdAt).format('h:mm a');
  //
  // li.text(`${message.from} ${formattedTimeStamp}:`);
  // a.attr('href', message.url);
  // li.append(a);

  // $('#messages').append(li);
});



$('#message-form').on('submit', (e) => {
  e.preventDefault();

  let messageTextBox = $('[name=message]');

  socket.emit(`createMessage`, {
    from: 'pinkfloyed',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('')
  });
});



let locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    /* geolocation IS NOT available */
    return alert(`Geolocation not supported by your browser.`);
  } else {
    /* geolocation is available */
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position) => {
      locationButton.removeAttr('disabled').text('Send location');

      console.log(position);
      socket.emit('currentLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, (e) => {
      locationButton.removeAttr('disabled').text('Send location');
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
