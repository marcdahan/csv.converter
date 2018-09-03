var gulp = require('gulp');
var browserSync = require("browser-sync");
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var beautyfullConsole = new(require('./src/lib/js/BeautyfullConsole'));

var path = {
    app: "src/app.js",
    index: "src/default.html",
    routers: "src/routers/*.js",
    privateModules: "privateModules/data-tool-kit/data-tool-kit/data-tool-kit.jquery.plugin.1.0.0.js",
    styles: {
        src: 'src/ui/scss/*.scss',
        dest: 'src/ui/css'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'dest/js/'
    },
    monitoredFiles: null
};

path.monitoredFiles = [
    "gulpfile.js",
    "package.json",
    path.index,
    path.app,
    path.privateModules,
    path.scripts.src,
    "js/form.js"
];

gulp.task('browser-sync', ['sass', 'nodemon'], function() {
    beautyfullConsole.log('BrowserSync');
	browserSync.init(null, {
		proxy: "http://127.0.0.1:5000",
        files: path.monitoredFiles,
        browser: "chrome"
	});
});

gulp.task('sass', function() {
    beautyfullConsole.log('Sass');
	return gulp.src(path.styles.src)
    	.pipe(sass())
    	.pipe(gulp.dest(path.styles.dest))
		.pipe(browserSync.reload({
            stream: true
	  	}));
});

gulp.task('nodemon', ['sass'], function(cb) {
	var started = false;
        beautyfullConsole.log('Nodemon');
	return nodemon({
		//exec: 'node --inspect --debug-brk',
		exec: 'node --inspect',
		script: path.app,
		verbose: true
	}).on('start', function() {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function() {
        beautyfullConsole.log('Server has restarted');
	});
});

gulp.task('default', ['sass', 'nodemon', 'browser-sync']);

gulp.watch(path.styles.src, ['sass']);
