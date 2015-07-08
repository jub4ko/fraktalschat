'use strict';

jQuery(function ($) {
    /*

    A lot of refactoring and cleaning up to do,
    Sorry for the mess!

    It was at some point strictly validated with jslint.
    but the whole structure is a mess ;) bear with me please.

    */

    var socket = io.connect(window.location.hostname);
    /* avatar */
    var $avatar = $('#avatar');
    var $addForm = $('#add-user');
    var $userBox = $('#username');
    /* chat */
    var $chatwrapper = $('#chatwrapper');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    /* user list*/
    var $userList = $('#user-list');
    var $chatusers = $('#chatusers');
    /* login / registration form */
    var $loginForm = $('#add-user')
    var $loginUsername = $('#add-user #loginusername');
    var $loginPass = $('#add-user #passuser');
    var $loginEmail = $('#add-user #emailuser');
    var $loginSubmit = $('#add-user #submit-newuser');


    /* utilities */
    var generateUser = function(){
      socket.emit('generate user', '', function (data) {
        $userBox.val(data);
      });
    }

    /* AVATAR */
    $('#username').on('click',function(){
        $(this).val('')
    });

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

    /* REGISTER LOGIN */
    var $loginForm = $('#login');
    var $loginUsername = $('#login #loginusername');
    var $loginPass = $('#login #passuser');
    var $loginEmail = $('#login #emailuser');
    var $loginSubmit = $('#login #submit-newuser');
    var loginuser;

    $loginForm.submit(function (e) {

      e.preventDefault();
      $loginForm.find('.error').hide();

      var str,
          seterror = false,
          registration = false;
      // crude form check
      str = $loginPass.val();
      if(str.length <= 5) { seterror = "password too short (min. 6)" };
      str = $loginUsername.val();
      if(str.length < 3 || str.length > 30){  seterror = "username is invalid" };

      if(seterror === false) {

          str = $loginEmail.val();
          if(str.length < 10) { seterror = "emailaddress is invalid" }else{
            registration = true;
          };

          loginuser = {
              name: $loginUsername.val(),
              pass: $loginPass.val(),
              email: $loginEmail.val()
          }
          if(registration === true) {
              socket.emit('registration user', loginuser);
          } else {
              socket.emit('login user', loginuser);
          }

      }else{
        console.log(seterror);
        $loginForm.find('.error').show().text(seterror);
      }
    })

    $('.loginbutton').on('click',function (e) {
      $('#user-register').fadeToggle();
      $('#avatar').fadeToggle();
      e.preventDefault();
    });
    $('#user-register').hide();

    /* MESSAGING */
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

        setTimeout(function(){$chat.scrollTop($chat[0].scrollHeight);},320);
    });

    socket.on('chatusers', function (data) {
        var item, users = '';
        for (item in data) {
            users += '<li>' + data[item] + "</li>";
        }
        $chatusers.html(users);
    });
});
