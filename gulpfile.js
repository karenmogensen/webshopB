var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	nodemon		= require('nodemon'),
	jshint		= require('gulp-jshint'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	rename 		= require('gulp-rename');

gulp.task('scripts', function(){
	gulp.src([	'src/public/scripts/services/product.service.js',
				'src/public/scripts/services/cart.service.js'
		])
	.pipe(concat('scripts.js'))
	.pipe(rename({
		extname: '.min.js'

		}))
	.pipe(uglify())	
	.pipe(gulp.dest('src/public/scripts/'))
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src([
			'src/public/scripts/**/*.js',
			'src/public/scripts/*.js', 
			'src/server/**/*.js'
		])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch( ['src/server/**/*.js', 'src/public/scripts/**/*.js'], ['jshint']);
});

gulp.task("nodemon", function(){
	var options = {
		script: 'src/server/server.js',
		watch: 'src/**/*.js'
	};

	return nodemon(options)
		.on("start", function(){
			console.log("nodemon started");
			startBrowserSync();
		})
		.on("restart", function(){
			console.log("nodemon restarted");
		})
})

function startBrowserSync(){
	if( browserSync.active ){
		return;
	}
	console.log("browserSync starting");

	var options = {
		proxy: 'localhost:' + 3000,
        port: 4000,
		ghostMode: {
			scroll: true
		},
		browser: ["firefox"],
		files: [
			'src/public/**/*',
			'src/server/server.js',
			'src/server/routes/*.js',
			'src/server/model/*.js',
			'src/server/api/*.js'
		]
	}
	browserSync(options);		
}

gulp.task("default", ["nodemon"]);
