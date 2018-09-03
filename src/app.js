/* jshint -W058, -W024 */
'use strict';
var express = require('express');
var app = express();
var router_home = require('./routers/router.home');
var router_jsonCsv = require('./routers/router.json-csv');
var bodyParser = require('body-parser');

/*******************************************************************\
 ******************************* TODO *******************************
 ********************************************************************
 * 
 * 1.  traitement des erreurs InvalidArgumentError  + {propertyName, propertyValue, errno }
 *     utilisation de verror  assert.equal(typeof (ip4addr), 'string','argument 'ip4addr' must be a string');
 * 2.  utilisation de promesse au lieu feedback
 * 2.5 CSV → JSON 
 * 3.  ajouter une réécriture d'url => variables d'environnement
 * 4.  réécriture du plugin avec typeScript
 * 5.  ajouter commentaires, documentation
 * 6.  ajouter une authentification oauth 2.0
 * 
 * *******************************************************************
*/

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router_jsonCsv); 
app.use('/', router_home);

app.listen(5000, function() {
  console.log('listening on port 5000!');
});
