$(document).ready(function() {

  $()

  $(document).on('click', '#enter', function() {
    SendMessage();


  }
  );
  function SendMessage() {
    var text = $('#send-msg').val();
    console.log(text);
    if (text.length != 0) {
      var newMsg = $('#template .message').clone();
      newMsg.find('.text').text(text);
      var data = new Date();
      var hours = data.getHours();
      var minutes = data.getMinutes();
      var time = hours + ':' + minutes;
      newMsg.find('.msg-time').text(time);
      newMsg.addClass('sent');
      $('.chat-messages').append(newMsg);
      $('#send-msg').val('')
      setTimeout(function(){
        receiveMessage()

       }, 1000);
    }
  }

  function receiveMessage() {
     var text = 'ok';
     var newMsg = $('#template .message').clone();
     newMsg.find('.text').text(text);
     var data = new Date();
     var hours = data.getHours();
     var minutes = data.getMinutes();
     var time = hours + ':' + minutes;
     newMsg.find('.msg-time').text(time);
     newMsg.addClass('received');
     $('.chat-messages').append(newMsg);
  }

});
