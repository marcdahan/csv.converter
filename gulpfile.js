var gulp = require('gulp');
var $ = jQuery = require('jquery');
require('./jquery.csv.js');
var env = "dev";
var browserSync = require('browser-sync').create();
//var sassOptions = {
//    indentType: tab,
//    indentWidth:1,
//    debug_info: true,
//  	outputStyle: 'nested',
//};
var src = {
	scss: 'src/scss/*',
	default: 'src/default.html'
};
var dev = {
	css: 'dev/css/',
	default: 'dev/default.html'
};
// Server
gulp.task('init_browserSync_dev', function() {
	browserSync.init({
        server: "dev/",
        index: "default.html",
        directory: false
	});
});
gulp.task('sass_dev', function() {
	return gulp.src(src.scss)
		.pipe(sass(sassOptions))
		//.on('error', sassOptions.logError) revoir la doc
		.pipe(gulp.dest(dev.css));
});
gulp.task('default', function() {
	gulp.watch(src.scss, ['sass_dev']).on("change", browserSync.reload);
});
gulp.task('default', ['init_browserSync_dev']);
