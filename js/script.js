$(document).ready(function() {

  $(document).on('click', '#enter', function() {
    SendMessage();
  });

  $(document).on('keyup', "#search-input", function() {
    var text = $('#search-input').val().toLowerCase().trim();
    var trovato;
    for (var i = 0; i < $('.contact-name').length; i++) {
     trovato = $('.contact-name').eq(i).text().toLowerCase().search(text);
     if (trovato == -1) {
      $('.contact-name').eq(i).parents('li.user').addClass('hidden');
     } else {
      $('.contact-name').eq(i).parents('li.user').removeClass('hidden');
     }
    }
  });

  $(document).on('keyup', "#send-msg", function() {
    if ($('#send-msg').val().length > 0) {
     $('#microfono').addClass('hidden');
     $('#enter').removeClass('hidden');
     } else {
     $('#microfono').removeClass('hidden');
     $('#enter').addClass('hidden');
     }
  });

  $(document).keypress(
    function(event){
    if (event.which == 13) {
      SendMessage();
    }
    }
  );

  $(document).on('click', ".user", function() {
    $('.user').removeClass('user-active');
    $(this).addClass('user-active');
    var ChatActive = $(".chat-messages").eq($(this).index());
    var imgActive;
    var nameUserActive;
    $('.chat-messages').removeClass('active');
    ChatActive.addClass("active");
    $('.user-chat-active').find('img').remove();
    $('.user-chat-active').find('.text p').text('');
    imgActive = $(this).find('img').clone();
    $('.user-chat-active').prepend(imgActive);
    nameUserActive = $(this).find('p').clone();
    $('.user-chat-active p').append(nameUserActive);
  });

    $(document).click(function(){
    $(".dropdown").addClass('hidden');
    });

    $(document).on('click', ".fas.fa-angle-down", function(e) {
      e.stopPropagation();
      var ThisDropdown = $(this).parents('.message').find('.dropdown');
      if (!ThisDropdown.hasClass('hidden')) {
        ThisDropdown.addClass('hidden');
      } else {
        ThisDropdown.removeClass('hidden');
      }
    });

  $(document).on('click', "#remove-msg", function() {
    $(this).parents('.message').find('.text').text('Hai eliminato questo messaggio');
    $(this).parents('.message').find('.text').addClass('italic');
  });


});


// FUNZIONI

function SendMessage() {
  var text = $('#send-msg').val();
  console.log(text);
  if (text.length != 0) {
    var newMsg = $('#template .message').clone();
    newMsg.find('.text').text(text);
    var data = new Date();
    var hours = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());
    var time = hours + ':' + minutes;
    newMsg.find('.msg-time').text(time);
    newMsg.addClass('sent');
    $('.chat-messages.active').append(newMsg);
    $('#send-msg').val('');
    scrollMessage();
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
   var hours = addZero(data.getHours());
   var minutes = addZero(data.getMinutes());
   var time = hours + ':' + minutes;

   newMsg.find('.msg-time').text(time);
   newMsg.addClass('received');
   $('.chat-messages.active').append(newMsg);
   scrollMessage();
}

// funzione che scrolla
function scrollMessage() {
    var heightContainer = $('.chat-messages.active').height();
    $('.chat-messages.active').scrollTop(heightContainer);
}

// funzione che aggiunge zero

function addZero(num) {
  if (num < 10) {
  num = '0' + num;
  }
  return num;
}
