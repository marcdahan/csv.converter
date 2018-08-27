var express = require('express');
var app = express();
var JsonCsvRouter  = express.Router();
var fs = require('fs');
var logger = fs.createWriteStream('src/logs/log.txt', {flags: 'a'});//todo mettre en place un gestionnaire
var dataToolKit = new (require('data-tool-kit'));

JsonCsvRouter.route('/json-to-csv')
    .post(function(req, res) {
        //todo checker les arguments passés en paramètres et envoyer une erreur. Faire une fonction de check comme checkArguments({k:v,...})
        var csv = dataToolKit.getCsvFromJson(JSON.parse(req.body.headers), req.body.fileName, JSON.parse(req.body.json));
        var fileName =  dataToolKit.getFileName();
        logger.write('DATE | HEURE | ' + fileName + '\r\n');
        res.status(200).send(csv);
    });

JsonCsvRouter.route('/csv-to-json')
    .get(function(req, res) {
        res.json(
            [{
                'Donald Duck': {
                    nephews: ['Huey', 'Dewey', 'Louie'],
                    friends: ['dingo', 'Gyro Gearloose']
                }
             }]);
    });

module.exports = JsonCsvRouter;
