const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// var clients = [];

app.set('view engine','ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
  res.render('pages/index');
});

io.on('connection', function(socket){

  var name = socket.id;

  socket.on('temp login', function(tempname){
    name = tempname;
  });

  console.log(name, socket.id);
/*
  if (!name) {
    name = clients.length;
    clients.push(socket.id);
  }
  
  console.log(clients);
*/

  socket.on('chat message', function(msg){
    io.emit('chat message', `<strong>User ${name}:</strong> ${msg}`);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
