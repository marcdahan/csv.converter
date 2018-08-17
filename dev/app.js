
var express = require('express');
var app = express();
var router = express.Router();
var $ = jQuery = require('jquery');
require('./lib/jquery.csv.js');

app.use(express.static('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/converter', function(req, res, next) {
    res.send(JSON.stringify(req));
});


app.get('/', function(req, res, next) {
    res.sendfile('dev/default.html');
});

app.listen(5000, function() {
  console.log('listening on port 5000!');
});
