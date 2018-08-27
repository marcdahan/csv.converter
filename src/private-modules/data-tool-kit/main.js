/* jshint -W061, -W098 */
var jsdom = require("jsdom");
var dom = new jsdom.JSDOM();
var $ = require("jquery")(dom.window);
var json2csv = require('json2csv').Parser;

/**
 * TODO : faire évolution [{id: 'identifiant'}, {name: 'nom'}, {surname: 'prénom'} ] pour les colonnes
 * puis pour la valeur à  : [
 *                          [ { id: '1'}, {name: 'Duck'}, {surname: 'Donald'} ],
 *                          [ ....
 *                      ]
*/

var DataToolKit = function() {
    this.fileName = null;
    this.headers = null;
    this.rawJson = null;
    this.arrayOfObjects = null;
    this.refinedArray = null;
    this.csv = null;
    this.init();
};

DataToolKit.prototype.init = function() {
    var variables = [];
    for (var key in this) {
        if (this[key] === null) {
            variables.push(key);
        }
    }
    $.each(variables, $.proxy(function(index, value) {
        var standardized = value.charAt(0).toUpperCase() + value.slice(1);
        eval('this.set' + standardized + ' = function(' + value + ' ) { this.' + value + ' = ' + value + '; }');
        eval('this.get' + standardized + ' = function() { return this.' + value + '; }');
        eval('this.reset' + standardized + ' = function(' + value + ' ) { this.' + value + ' = ' + value + '; }');
    }, this));
};

DataToolKit.prototype.getCsvFromJson = function(headers, fileName, json) {
	if (headers && this.isArray(headers) && json && this.isJSON(json) && fileName) {
        this.setHeaders(headers);
        this.setFileName(fileName);
        this.resetArrayOfObjects([]);
        this.resetCsv([]);
        this.convertJsonToArrayOfObjects(json);
        this.convertArrayOfObjects2CSV();
        return this.getCsv();
    } else { 
        throw "bad parameter";
    }
};

DataToolKit.prototype.convertJsonToRefinedArray = function(json, path) {
    if (!this.isJSON(json)) {
        throw "bad parameter" + JSON.stringify(json);
    }
    $.each(json, $.proxy(function(key, value) {
        if ($.type(value) === "object") {
            path = (path ? path + '.' : '');
            this.convertJsonToRefinedArray(value, path + key);
        } else if ($.type(value) === "string") {
            this.refinedArray.push([path, key, "" + value]);
        }
    }, this));
};

DataToolKit.prototype.convertJsonToArrayOfObjects = function(json, path) {
    if (!this.isJSON(json)) {
        throw "bad parameter" + JSON.stringify(json);
    }
    $.each(json, $.proxy(function(key, value) {
        if ($.type(value) === "object") {
            this.convertJsonToArrayOfObjects(value, (path ? path + '.' : '') + key);
        } else if ($.type(value) === "string") {
            var o = {};
            var headers = this.getHeaders();
            o[headers[0]] = path;
            o[headers[1]] = key;
            o[headers[2]] = value;
            this.arrayOfObjects.push(o); //TODO check anomalie doit se faire automatiquement
        }
    }, this));
};

DataToolKit.prototype.convertArrayOfObjects2CSV = function() {
    var json2csvParser = new json2csv(this.getHeaders());
    this.setCsv(json2csvParser.parse(this.getArrayOfObjects()));
};

DataToolKit.prototype.isJSON = function(json) {
    var bool = false;
    if (Object.prototype.toString.call(json) === '[object Object]') {
        bool = true;
    }
    return bool;
};

DataToolKit.prototype.isArray = function(arr) {
    var bool = false;
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        bool = true;
    }
    return bool;
};

module.exports = DataToolKit;
