// TODO: le rendre en gulp plugin: cf.https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md

function BeautyfullConsole() {
    this.line = '****************************************';
}

BeautyfullConsole.prototype.log = function(str) {
	var strLength = str.length;
    var length = 40;
	var line = this.line.slice();
    var sidesLength = (length - 2 - strLength) / 2;
	if (strLength%2 != 0) {
        line += '**';
    }
    var side = '';
    for (var i = 0; i <= sidesLength; i++) {
        side += ' ';
    }
    console.log(line + '\n'+  side + ' ' + str + ' ' + side);
};

module.exports = BeautyfullConsole;
