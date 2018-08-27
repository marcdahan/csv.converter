/* jshint -W058, -W024 */
'use strict';
var express = require('express');
var app = express();
var homeRouter = require('./routers/homeRouter');
var jsonCsvRouter = require('./routers/json-csv-router');
var bodyParser = require('body-parser');


/*
 * TODO
 * 1. traitement des erreurs InvalidArgumentError  + {propertyName, propertyValue, errno }
 *    utilisation de verror  assert.equal(typeof (ip4addr), 'string','argument 'ip4addr' must be a string');
 * 2. utilisation de promesse au lieu feedback
 * 3. ajouter une réécriture d'url => variables d'environnement
 * 4. réécriture en ES2015 ou bien en typeScript
 * 5. ajouter commentaires, documentation
*/

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', jsonCsvRouter);
app.use('/', homeRouter);

app.listen(5000, function() {
  console.log('listening on port 5000!');
});
