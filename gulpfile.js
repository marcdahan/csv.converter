var gulp = require('gulp');
var browserSync = require("browser-sync");
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], function() {
	console.log('task default');
});

gulp.task('browser-sync', ['nodemon'], function() {
	console.log('bs init');
	browserSync.init(null, {
		proxy: "http://127.0.0.1:5000",
        files: ["dev/**/*.*"],
        browser: "chrome",
        port: 7000
	});
});

gulp.task('nodemon', function(cb) {
	var started = false;
	return nodemon({
		//exec: 'node --inspect --debug-brk',
		exec: 'node --inspect',
		script: 'dev/app.js',
		verbose: true
	}).on('start', function() {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function() {
		console.log('-------restarted-------');
	});
});
