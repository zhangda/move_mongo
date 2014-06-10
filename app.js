
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var shop = require('./routes/shop');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/move_mongo')
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('yay!')
  });

var app = express();
var server = http.createServer(app)
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  socket.emit('open');

  socket.on('message', function(msg){
    var s = msg.split(",")
    shop.socket_query(s[0], s[1], s[2],function(err, shops){
      socket.emit('message',JSON.stringify(shops));
     })
    });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
app.get('/', function(req, res){
  res.sendfile('views/gps.html');
});

app.get('/users', user.list);

app.get('/shop/query', shop.query);
app.post('/shop', shop.post);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
