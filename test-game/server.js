#!/usr/bin/env node

var rooms = new Array();
var players = new Array();
var dbOut = "Not connected";

function remFromArray(n,a)
{
	for (var i =0; i < a.length; i++)
	   if (a[i] === n) {
	      a.splice(i,1);
	      break;
   }

   return a;
}

function Room(id) {
    this.id = id;
    this.players = new Array();
    this.getInfo = function() {
        //return this.color + ' ' + this.type + ' apple';
    };

    this.addPlayer = function(tag)
    {
		this.players.push(tag);
	}

	this.removePlayer = function(tag)
	{
		this.players = remFromArray(tag,players);
	}
}

function Player(id) {
    this.id = id;
}


/*********************** Generate rooms*/ 
for(var i=0;i<10;i++)
{
	var genID = Math.random().toString(36).slice(2);
	rooms.push(new Room(genID));
}

/*********************** Generate rooms*/


/* Express 3 requires that you instantiate a `http.Server` to attach socket.io to first */
var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    port = 8080,
    url  = 'http://localhost:' + port + '/';
/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
  url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

// Retrieve
var db  = require('mongodb').MongoClient;
var playersDB =  null;

// Connect to the db
db.connect("mongodb://nodejitsu:5ce4b6bb4790ce52b5b77cdcadd47474@dharma.mongohq.com:10090/nodejitsudb6877412684", function(err, db) {
  if(!err) {
    dbOut = "We are connected";
    db.createCollection('players', {w:1}, function(err, collection) {});
    db.createCollection('rooms', {w:1}, function(err, collection) {});
    playersDB = db.collection('players');
  }
});

server.listen(port);
console.log("Express server listening on port " + port);
console.log(url);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

//Socket.io emits this event when a connection is made.
io.sockets.on('connection', function (socket) {
   

  var myMessage = 'Hello. I know socket.io.';

  // Emit a message to send it to the client.
  socket.emit('ping', { msg: rooms, db:dbOut });

  // Print messages from the client.
  socket.on('clientMessage', function (data) {
    var mType = data.type;
    switch(mType)
    {
    case "handshake":
      /execute code block 1/
      break;
    case "addPlayer":
        addPlayer(data.inf);
      break;
    default:
      /code to be executed if n is different from case 1 and 2/
    }
    
  });

});


function addPlayer()
{
    var doc1 = {'Player':{'name':'dude'}};
    playersDB.insert(doc1);
}