var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  var name = clients.indexOf(socket.id);

  console.log(name, socket.id, clients);

  if (!name) {
    name = clients.length-1;
    clients.push(socket.id);
  }
  
  console.log(clients);


  socket.on('chat message', function(msg){
    io.emit('chat message', `<strong>User ${name}:</strong> ${msg}`);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
