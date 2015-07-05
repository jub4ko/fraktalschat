'use strict';

jQuery(function ($) {
    var socket = io.connect(window.location.hostname);

    var $avatar = $('#avatar');
    var $addForm = $('#add-user');
    var $userBox = $('#username');

    var $chatwrapper = $('#chatwrapper');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    var $userList = $('#user-list');
    var $chatusers = $('#chatusers');

    var generateUser = function(){
      socket.emit('generate user', '', function (data) {
        $userBox.val(data);
      });
    }

    window.addEventListener("load", function(){
           if(document.height <= window.outerHeight)
           {
               document.body.style.height = (window.outerHeight + 50) + 'px';
               setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
           }
           else
           {
               setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
           }
       }
    );

    function hideAddressBar() {
        if(!window.location.hash) {
            if(document.height < window.outerHeight) {
                document.body.style.height = (window.outerHeight + 50) + 'px';
            }
            setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
        }
    }

    window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
    window.addEventListener("orientationchange", hideAddressBar );

    $('a.recycle').on('click',function(e){
        $userBox.val('')
        generateUser();
        e.preventDefault();
    }).trigger('click');

    $addForm.submit(function (e) {
        e.preventDefault();
        socket.emit('new user', $userBox.val(), function (data) {
            if (data == 'true') {
                $avatar.remove();
                $chatwrapper.removeClass('hide').fadeIn();
                $userList.removeClass('hide').fadeIn();
            } else {
                var error = $avatar.find('.error')
                error.html(data);
                error.fadeIn();
            }
        });
        $userBox.val('');
    });

    $messageForm.submit(function (e) {
      e.preventDefault();
      socket.emit('send message', $messageBox.val());
      $messageBox.val('');
    });

    socket.on('new message', function (data) {
        var node = $('<li><span class="time">' + data.timestamp + '</span> <span class="msg-user"><strong>' + data.user + "</strong></span> <span class='msg-content'></span></li>");
        node.find('.msg-content').text(data.message);
        node.children().hide();
        node.appendTo($chat).css({'top':'-30px',opacity:0,'width':'0','min-height':'0'}).animate({'top':'0',opacity:1,'width':'75%','min-height':'45px'},200,function(){
          $(this).removeAttr('style');
          $(this).children().fadeIn(100);
        });
        $chat.scrollTop($chat[0].scrollHeight);
    });

    socket.on('chatusers', function (data) {
        var item, users = '';
        for (item in data) {
            users += '<li>' + data[item] + "</li>";
        }
        $chatusers.html(users);
    });
});
