var JsonParser = function(Columns, fileName) {
    this.fileName = fileName;
    this.table = [];
    this.csv = null;
    this.jsonCopy = null;
    if (Object.prototype.toString.call(Columns) === '[object Array]') {
        this.table.push(Columns);
    } else {
        throw "bad parameter";
    }
};

JsonParser.prototype.isJSON = function(json) {
    var bool = false;
    if (Object.prototype.toString.call(json) === '[object Object]') {
        bool = true;
    }
    return bool;
};

JsonParser.prototype.jsonToTable = function(json, path) {
    if (!this.isJSON(json)) {
        throw "bad parameter" + JSON.parse(json);
    }
    $.each(json, $.proxy(function(key, value) {
        if ($.type(value) == "object") {
            path = (path ? path + '.' : '');
            this.jsonToTable(value, path + key);
        } else if ($.type(value) == "string") {
            this.table.push([path, key, "" + value]);
        }
    }, this));
};

JsonParser.prototype.tabletoCsv = function() {
    var pretreated = [];
    $.each(this.table,function(index, value) {
        pretreated.push(value.join('|'));
    });
    this.csv = pretreated.join('\r');
};

JsonParser.prototype.jsonToCsv = function(json) {
    this.jsonCopy = $.extend({}, json);
    this.jsonToTable(json);
    this.tabletoCsv(this.table);
};


JsonParser.prototype.exportJsonToCsv = function(json) {
    this.jsonToTable(json);
    var a         = document.createElement('a');
    a.href        = 'data:text/csv;charset=UTF-8' + escape(this.table);
    a.target      = '_blank';
    a.download    = 'export.csv';
    document.body.appendChild(a);
    a.click();
};
