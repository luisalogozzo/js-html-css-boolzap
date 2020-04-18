$(document).ready(function() {
  LastMessage();

  $(document).on('click', '#enter', function() {
    SendMessage();
    LastMessage();

  });

  //----------- invio messaggi con tasto enter
    $(document).keypress(
      function(event){
      if (event.which == 13) {
        SendMessage();
        LastMessage();

      }
    });

  //---------------- cerca contatti nell'input search

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


//------------------- switch microfono/paperplane
  $(document).on('keyup', "#send-msg", function() {
    if ($('#send-msg').val().length  > 0) {
     $('#microfono').addClass('hidden');
     $('#enter').removeClass('hidden');
     } else {
     $('#microfono').removeClass('hidden');
     $('#enter').addClass('hidden');
     }
  });

//------------- hover sugli users della chat-list
  $(".user").hover(function(){
    $(this).addClass('user-hover');;
    }, function(){
    $(this).removeClass('user-hover');;
  });

  //------------- switch da una chat all'altra
  $(document).on('click', ".user", function() {
    $('.user-active').removeClass('user-active');
    var UserActive = $(this).addClass('user-active');
    $('.chat-messages.active').removeClass('active');
    var userData = $(this).attr('data-contact');
    $('[data-contact~=' + userData + ']').addClass('active');

    $('.user-on-the-top').find('img').remove();
    $('.user-on-the-top').find('.text p').text('');
    imgActive = $(this).find('img').clone();
    $('.user-on-the-top').prepend(imgActive);
    nameUserActive = $(this).find('p').clone();
    $('.user-on-the-top p').append(nameUserActive);

  });

  // ----------------------------dropdown

  $(document).click(function(){
    $('.chat-messages.active .message').find('.dropdown').remove();
    $('.msg-text i').removeClass('visible');

  });

  $(document).on('click', ".fas.fa-angle-down", function(e) {
    e.stopPropagation();
    var ThisMessage = $(this).parents('.message');

    if ($('.chat-messages.active .msg-text').find('div').hasClass('dropdown')) {
      $('.chat-messages.active .msg-text').find('.dropdown').remove();
      $('.msg-text i').removeClass('visible');
    } else {
       var DropdownClone = $('#template .dropdown').clone();
       $(this).parents('.msg-text').append(DropdownClone);
       $(this).addClass('visible');
       console.log('dropdown');
      }


  });

//------------------------------ cancella messaggio
  $(document).on('click', "#remove-msg", function() {
    $(this).parents('.message').remove();
    // $(this).parents('.message').find('.text').text('Hai eliminato questo messaggio');
    // $(this).parents('.message').find('.text').addClass('italic');
  });


});


// FUNZIONI

function SendMessage() {
  var text = $('#send-msg').val();
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
      receiveMessage();
      LastMessage();
      LastHour()
    }, 1500);
  }
}

function receiveMessage() {
   var text = CreateRandomSentences();
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

// funzione che controlla ultimo messaggio e fa l'append nella chat-list
function LastMessage() {
  if ($('.chat-messages li').is(':last-child')) {
    $('.user-active small').empty();
    var lastMsgText = $('.chat-messages li:last-child').find('p').text();
    var newText = $('.user-active small').append(lastMsgText);
  }
  return console.log(newText)
}

// funzione che aggiorna l'ora
function LastHour() {
  if ($('.chat-messages li').is(':last-child')) {
    $('.user-active time').empty();
    var lastHourText = $('.chat-messages li:last-child').find('time').text();

    var newHour = $('.user-active time').append(lastHourText);
  }
  return console.log(newHour)
}

// funzione che aggiorna ordine chat-list in base all'ora
// function OrganizeChatList(lastHour) {
//   for (var i = 0; i < array.length; i++) {
//     if (lastHour > $('[data-contact~=' + i + ']').find('time').text()) {
//
//     }
//   }
// }



// funzione che scrolla
function scrollMessage() {
  var heightContainer = $('.chat-messages.active').prop('scrollHeight');
  $('.chat-messages.active').scrollTop(heightContainer);
}

// funzione che aggiunge zero
function addZero(num) {
  if (num < 10) {
  num = '0' + num;
  }
  return num;
}

// funzione che crea risposte casuali
function CreateRandomSentences() {
  var RandSentences = [
    'Se c’è un rimedio, perché te la prendi? E se non c’è un rimedio, perché te la prendi?',
    'Ci sono tre verità: la mia verità. la tua verità, e la verità.',
    'Se le vostre parole non sono migliori del silenzio, dovreste restare zitti.',
    'Incontrare un amico dopo tanti anni è come godersi una  pioggia rinfrescante dopo un periodo di siccità',
    'Ho l\'orologio che va avanti di tre ore ma non sono mai riuscito ad aggiustarlo. Così da Los Angeles mi sono trasferito a New York.',
    'Quando ero piccolo i miei genitori mi volevano talmente bene che mi misero nella culla un orsacchiotto. Vivo.'
  ];

  var RandNum = Math.floor(Math.random() * RandSentences.length);
  var RandSentence = RandSentences[RandNum];

  return RandSentence;
}
