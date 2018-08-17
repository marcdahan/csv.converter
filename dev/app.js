
var express = require('express');
var app = express();
var dataToolKit = new (require('data-tool-kit'));
var app = express();
var router = express.Router();

app.use(express.static('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/dataToolKit/converter/jsonToTable', function(req, res, next) {
    dataToolKit.init(req.query.columns, req.query.fileName);
    dataToolKit.jsonToTable(req.query.json);
    res.send(JSON.stringify(dataToolKit.getTable()));
});


app.get('(/default.html|\/)', function(req, res, next) {
    res.sendfile('dev/default.html');
});

app.listen(5000, function() {
  console.log('listening on port 5000!');
});
