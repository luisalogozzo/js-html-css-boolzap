$(document).ready(function() {

  $(document).on('click', '#enter', function() {
    SendMessage();


  });

  //----------- invio messaggi con tasto enter
    $(document).keypress(
      function(event){
      if (event.which == 13) {
        SendMessage();
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
      }


  });

//------------------------------ cancella messaggio
  $(document).on('click', "#remove-msg", function() {
    $(this).parents('.message').remove();
    var ActUserDat = $('.user-active').attr('data-contact');
    var lastMsg = $('.chat-messages.active').find('li:last-child .text').text();

    Refresh(lastMsg, ActUserDat);
  });


});


// FUNZIONI

function SendMessage() {
  var text = $('#send-msg').val();
  if (text.length != 0) {
    var newMsg = $('#template .message').clone();
    newMsg.find('.text').text(text);
    const date = moment().format("HH.mm");
    newMsg.find('.msg-time').text(date);
    newMsg = newMsg.addClass('sent');
    var MsgText = newMsg.find('p').text()
    $('.chat-messages.active').append(newMsg);
    console.log(MsgText);
    $('#chat-list ul').prepend($('.user-active'));
    $('#send-msg').val('');
    var ActUserDat = $('.user-active').attr('data-contact');
    LastHour();
    LastMessage(MsgText, ActUserDat);
    scrollMessage();
    setTimeout(function(){
        receiveMessage(newMsg, ActUserDat);
    }, 1500);
  }
}

function receiveMessage(msgSent, ActUserDat) {
   var text = CreateRandomSentences();
   var newMsg = $('#template .message').clone();
   newMsg.find('.text').text(text);
   const date = moment().format("HH.mm");
   newMsg.find('.msg-time').text(date);
   newMsg.addClass('received');
   var MsgText = newMsg.find('p').text();
   $(msgSent).parent('ul').append(newMsg);
   scrollMessage();
   LastMessage(MsgText, ActUserDat);
   LastHour()
}


// funzione che controlla ultimo messaggio e fa l'append nella chat-list
function LastMessage(MsgText, ActUserDat) {
  var Users = $('#chat-list ul li');
  for (var i = 0; i < Users.length; i++) {
    if ($(Users[i]).attr('data-contact') == ActUserDat) {
      $(Users[i]).find('small').html(MsgText);
    }
  }
}

// funzione che aggiorna l'ora
function LastHour() {
  if ($('.chat-messages.active li').is(':last-child')) {
    $('.user-active time').empty();
    var lastHourText = $('.chat-messages.active li:last-child').find('time').text();
    // console.log(lastHourText);
    var newHour = $('.user-active time').append(lastHourText);
  }
}

// funzione che aggiorna ordine dei contatti in base all'ora
function OrganizeChatList() {
  var ChatListLength = $('#chat-list ul li').length;
  var i = 0;
  var UserActiveTime = $('.user-active').find('time').text().replace('.', '');
  var UserTime;
  do {
    UserTime = $('.user').eq(i).find('time').text().replace('.', '');
    if (UserActiveTime > UserTime) {
      $('.user-active').insertBefore($('#chat-list ul .user').eq(i));
      return;
    }
    i++;
  } while (i < ChatListLength);
    $('.user-active').insertAfter('#chat-list ul li:last-child');
}

// funzione che refresha dopo la cancellazione dei messaggi
function Refresh(MsgText, ActUserDat) {
  LastHour();
  LastMessage(MsgText, ActUserDat);
  OrganizeChatList();
}

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
