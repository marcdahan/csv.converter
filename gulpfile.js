var gulp = require('gulp');
var browserSync = require("browser-sync");
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

var path = {
    app: "src/app.js",
    index: "src/default.html",
    privateModules: "privateModules/data-tool-kit/data-tool-kit/data-tool-kit.jquery.plugin.1.0.0.js",
    styles: {
        src: 'src/ui/scss/*.scss',
        dest: 'src/ui/css'
    },
    monitoredFiles: null
};

path.monitoredFiles = [
    "gulpfile.js",
    "package.json",
    path.index,
    path.app,
    path.privateModules,
    "js/form.js"
];

function consoleLog(str) { //todo faire une fonction qui harmonise la dimension des logs
    console.log('----------------------------------\n'+
                '------------ ' + str + ' -----------\n'+
                '----------------------------------');
}

gulp.task('browser-sync', ['sass', 'nodemon'], function() {
    consoleLog('browserSync run');
	browserSync.init(null, {
		proxy: "http://127.0.0.1:5000",
        files: path.monitoredFiles,
        browser: "chrome",
        port: 7000
	});
});

gulp.task('sass', function() {
    consoleLog('sass operations');
	return gulp.src(path.styles.src)
    	.pipe(sass())
    	.pipe(gulp.dest(path.styles.dest))
		.pipe(browserSync.reload({
            stream: true
	  	}));
});

gulp.task('nodemon', ['sass'], function(cb) {
	var started = false;
        consoleLog('nodemon run');
	return nodemon({
		//exec: 'node --inspect --debug-brk',
		exec: 'node --inspect',
        //todo ajouter une règle pour limiter le scope de nodemon
		script: 'src/app.js',
		verbose: true
	}).on('start', function() {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function() {
        consoleLog('restarted by nodemon');
	});
});

gulp.task('default', ['sass', 'nodemon', 'browser-sync'], function() {
    consoleLog('default running');
});

gulp.watch(path.styles.src, ['sass']);
