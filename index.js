const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// var clients = [];

app.set('view engine','ejs');

// use res.render to load up an ejs view file
// index page 
app.get('*', (req, res) => {
  res.render('pages/index');
  const url = req.url;

  io.on('connection', (socket) => {
    // Sends message when someone joins the page
    io.emit('system message', `A User Join the Chat`);
  
    var name = "Temp User " + socket.id;
    
    socket.join(url);

    console.log(url);
  
    console.log(socket.id);
  
    // When a username is picked
    socket.on('nickname pick', (nickname) => {
      io.emit('system message', `${name} changed their nickname to ${nickname}`);
      name = nickname;
      return name;
    });
  
    // When a normal chat message is sent
    socket.on('chat message', (msg) => {
      io.emit('chat message', `${name}: ${msg}`);
    });
  
    // Used for system messages that will face the client
    socket.on('system message', (msg) => {
      io.emit('system message', `${msg}`);
    });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
