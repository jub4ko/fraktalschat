/*jslint node: true */
"use strict";

var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var chatusers = [];

var db = require('mongoskin').db('mongodb://fraktalsadmin:fraktalspass@ds047772.mongolab.com:47772/fraktalschat');
var users = db.collection('userschat');

function findUser(username,password) {
  if(username === undefined)return;
  var userresult = false;
  users.find({name:username}, function(err, result) {
      result.each(function(err, user) {
          if(user){
              userresult = user
          }
      });
  });

}


/*
db.collection('userschat').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});
*/

console.log('Server: Fraktals Chat started.');
app.use(express.static(path.join(__dirname, 'static')));

console.log('Server running at port: ' + (process.env.PORT || 80) + '.');
server.listen(process.env.PORT || 80);


app.get('/', function (req, res) {
    req = req;
    res.sendFile(__dirname + '/web/chat/index.html');
});

console.log('Server routing configured.');

/* Utilities */
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0": "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0": "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0": "") + sec;
    return hour + ":" + min + ":" + sec;
}

function randomName(data) {
    data = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], ['Fire', 'Wind', 'Earth', 'Water', 'Electric', 'Wood', 'Ghost', 'Light', 'Shadow', 'Metal', 'Psychic', 'Aether', 'Spring', 'Summer', 'Autumn', 'Winter'], ['Mog', 'Shiva', 'Ifrit', 'Ramuh', 'Titan', 'Odin', 'Leviathan', 'Bahamut', 'Phoenix', 'Kujata'], ['', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']];
    var no1 = data[0][Math.round(Math.random() * (data[0].length - 1))];
    var no2 = data[1][Math.round(Math.random() * (data[1].length - 1))];
    var no3 = data[2][Math.round(Math.random() * (data[2].length - 1))];
    var no4 = data[3][Math.round(Math.random() * (data[3].length - 1))];
    return no1 + ". " + no2 + "-" + no3 + " " + no4;
}

io.on('connection', function (socket) {
    function updateChatUsers() {
        io.sockets.emit('chatusers', chatusers);
    }

    function systemMessage(user, message, type) {
        type = type || "msg-system";
        io.sockets.emit('new message', {user: user, timestamp: getDateTime(), message: message});
    }

    socket.on('new user', function (data, callback) {
        if (chatusers.indexOf(data) !== -1) {
            callback('This username is already in use.');
        } else if (data.length > 30) {
            callback('This username is too long. (max 30)');
        } else if (data.length < 6) {
            callback('This username is too short. (min 6)');
        } else {
            socket.nickname = data;
            chatusers.push(socket.nickname);
            systemMessage(socket.nickname, 'entered the room.', "msg-joined");
            callback('true');
            updateChatUsers();
        }
    });

    socket.on('registration user', function (user, callback) {
        if (chatusers.indexOf(user.name) !== -1 && findUser(username) === false) {
            users.insert({name: user.name,user:{
                pass: user.pass,
                email: user.email,
                ipaddress: '0.0.0.0',
                privilage: (user.privilage || 'user') },
                config: { color: '#F6A' }
            });
        }
    });

    socket.on('login user', function (user, callback) {
      var profile = findUser(user.name);
      console.log('found profile: ');
      console.log(profile)
    });

    socket.on('generate user', function (data, callback) {
        callback(randomName(data));
    });

    socket.on('send message', function (data) {
        data = data.toString().substring(0, 255);
        io.sockets.emit('new message', {user: socket.nickname, timestamp: getDateTime(), message: data});
    });

    socket.on('disconnect', function (data) {
        data = data;
        if (socket.nickname) {
            chatusers.splice(chatusers.indexOf(socket.nickname), 1);
            updateChatUsers();
            systemMessage(socket.nickname, 'left the room.');
        }
    });

    console.log('Socket bindings initiated.');
});
