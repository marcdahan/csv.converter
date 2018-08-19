var gulp = require('gulp');
var browserSync = require("browser-sync");
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('browser-sync', ['nodemon'], function() {
	console.log('                                  ');
	console.log('---------browserSync run ---------');
	browserSync.init(null, {
		proxy: "http://127.0.0.1:5000",
        files: ["src/**/*.*"],
        browser: "chrome",
        port: 7000
	});
});

gulp.task('nodemon', function(cb) {
	var started = false;
	console.log('                                  ');
	console.log('-----------nodemon run -----------');
	return nodemon({
		//exec: 'node --inspect --debug-brk',
		exec: 'node --inspect',
		script: 'src/app.js',
		verbose: true
	}).on('start', function() {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function() {
		console.log('                                  ');
		console.log('-------restarted by nodemon-------');
	});
});

gulp.task('sass', function() {
	console.log('                                  ');
	console.log('------------ sass ops ------------');
	return gulp.src('src/scss/*.scss')
    	.pipe(sass())
    	.pipe(gulp.dest('src/css'));
});

gulp.task('default', ['browser-sync', 'sass'], function() {
	console.log('                                  ');
	console.log('--------------gulp run------------');
});
