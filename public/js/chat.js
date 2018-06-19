var socket = io();

let scrollToBottom = () => {
  // Selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child')
  // Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', () => {
  console.log('Connected to server');

  let params = $.deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No Error.');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList' ,(users) => {
  let ol = $('<ol></ol>')

  users.forEach( (user) => {
    ol.append( $('<li></li>').text(user) );
  });

  $('#users').html(ol)
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
  scrollToBottom();


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
  scrollToBottom();

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
