/* jshint -W058 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var logger = fs.createWriteStream('src/logs/log.txt', {flags: 'a'});//todo mettre en place un gestionnaire
var dataToolKit = new (require('data-tool-kit'));

/*
 * TODO
 * 1. traitement des erreurs
 * 2. utilisation de promesse au lieu feedback
 * 3. ajouter une réécriture d'url => variables d'environnement
 * 4. réécriture en ES2015 ou bien en typeScript
*/

app.use(express.static('src'));
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
    res.sendfile('src/default.html');
});

app.listen(5000, function() {
  console.log('listening on port 5000!');
});
