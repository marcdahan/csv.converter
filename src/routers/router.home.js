var express = require('express');
var HomeRouter = express.Router();

HomeRouter.route('(/default.html|\/)')
    .get(function(req, res) {
    	res.sendfile('src/default.html');
    });


module.exports = HomeRouter;
