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
      $('.chat-messages.active').append(newMsg);
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
     $('.chat-messages.active').append(newMsg);
  }

  $(document).on('keydown', "#search-input", function() {
    setTimeout(function(){
      var text = $('#search-input').val().toLowerCase();
      var trovato;
        for (var i = 0; i < $('.contact-name').length; i++) {
          trovato = $('.contact-name').eq(i).text().toLowerCase().search(text);
          if (trovato == -1) {
            $('.contact-name').eq(i).parents('li.user').addClass('hidden');
          } else {
            $('.contact-name').eq(i).parents('li.user').removeClass('hidden');
          }
        }
        console.log($('.contact-name').text());

    }, 1);
  });


  $(document).on('keydown', "#send-msg", function() {
    setTimeout(function(){

      if ($('#send-msg').val().length > 0) {
       $('#microfono').addClass('hidden');
       $('#enter').removeClass('hidden');
     } else {
       $('#microfono').removeClass('hidden');
       $('#enter').addClass('hidden');
     }
    }, 1);
  });

  $(document).on('click', ".user", function() {
    $('.user').removeClass('user-active');
    $(this).addClass('user-active');
    var ChatActive = $(".chat-messages").eq($(this).index());
    var imgActive;
    var nameUserActive;

    for (var i = 0; i < $('.user').length; i++) {
      if ($('.user').eq(i).hasClass('user-active')) {
        $('.chat-messages').removeClass('active');
        ChatActive.addClass("active");
        $('.user-chat-active').find('img').remove();
        $('.user-chat-active').find('.text p').text('');

        imgActive = $(this).find('img').clone();
        $('.user-chat-active').prepend(imgActive);
        nameUserActive = $(this).find('p').clone();
        $('.user-chat-active p').append(nameUserActive);



    }



    }
  });













});
