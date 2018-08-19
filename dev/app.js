/* jshint -W058 */
var express = require('express');
var app = express();
var dataToolKit = new (require('data-tool-kit'));
var app = express();

app.use(express.static('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/dataToolKit/converter/json-to-csv', function(req, res) {
    var csv = dataToolKit.convertJson2CSV(req.query.columns, req.query.fileName, req.query.json);
    res.setHeader('Content-disposition', 'attachment;' + req.query.fileName);
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
});


app.get('(/default.html|\/)', function(req, res) {
    res.sendfile('dev/default.html');
});

app.listen(5000, function() {
  console.log('listening on port 5000!');
});
