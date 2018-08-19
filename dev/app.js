/* jshint -W058 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
// var createCsvWriter = require('csv-writer').createObjectCsvWriter;
var dataToolKit = new (require('data-tool-kit'));

var logger = fs.createWriteStream('dev/logs/log.txt', {flags: 'a'});

app.use(express.static('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/dataToolKit/converter/json-to-csv', function(req, res) {
    var csv = dataToolKit.getCsvFromJson(JSON.parse(req.body.headers), req.body.fileName, JSON.parse(req.body.json));
    var fileName =  dataToolKit.getFileName();
    logger.write('DATE | HEURE | ' + fileName + '\r\n');
    res.status(200).send(csv);
});


app.get('(/default.html|\/)', function(req, res) {
    res.sendfile('dev/default.html');
});

app.listen(5000, function() {
  console.log('listening on port 5000!');
});


// var csvWriter = createCsvWriter({
//     path: 'dev/exports/' + fileName + '.csv',
//     header: [
//         {id: 'context', title: 'Context'},
//         {id: 'english', title: 'English'},
//         {id: 'français', title: 'Français'}
//     ]
// });
// csvWriter.writeRecords(csv).then(function() {
//     logger.write('DATE | HEURE | ' + fileName + '\r\n');
// });
