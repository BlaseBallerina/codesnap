"use strict";

var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	eslint = require('gulp-eslint'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify'),
	// clean = require('gulp-clean'),
  // gutil = require('gulp-util'),
  // bower = require('bower'),
  concat = require('gulp-concat'),
	del = require('del'),
	jade = require('gulp-jade'),
	minifyCss = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	concatCss = require('gulp-concat'),
  sass = require('gulp-sass');
  // rename = require('gulp-rename'),
  // sh = require('shelljs');

//all assets paths
var paths = {
  scripts: ['client/js/**/*.js', '!client/lib/**/*'],
  css: 'client/scss/*.scss',
	jade: ['client/**/*.jade', 'client/*.jade']
};




//gulp default task
gulp.task('default', ['lint', 'test'], function () {
    console.log('READDDDY TO RUMMMMBLE');
});


//main watch task which will build dist folder and refresh
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.css, ['css']);
	gulp.watch(paths.jade, ['jade']);
});

//build task, which will properly build entire client
gulp.task('build', ['scripts', 'css', 'jade'], function() {
	console.log('app built');
});



//clean dist folder
gulp.task('clean', function(cb) {
  del(['dist'], cb);
});


//minify and concat js files
gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream());
});


//sass compiliation. Also browsersync called.
gulp.task('css', function() {
    return gulp.src(paths.css)
				.pipe(sourcemaps.init())
				.pipe(sass())
				.pipe(minifyCss())
				.pipe(concatCss("styles.min.css"))
				.pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});





//browser sync initialization
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

});

//jade compiliation

gulp.task('jade', [], function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream());
});



//testing call
gulp.task('test', [], function() {
	console.log('*****TESTING*****');
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
				chai: require('chai'),
				assert: require('chai').assert,
				expect: require('chai').expect,
				should: require('chai').should()
      }
    }));
});

//eslint task
gulp.task('lint', function () {
	console.log('*****LINTING*****');
    return gulp.src(['server/**/*.js', 'client/**/*.js', './gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});



//integrate instructions
gulp.task('integrate', function() {
	console.log('\n');
	console.log('*****DEV TEAM TASKS******');
	console.log('\n');
	console.log('1. ensure that you have latest known-good code. ("git pull --rebase upstream master")');
	console.log('2. make sure git status is clean');
	console.log('3. test and lint on your box (run "gulp")');
	console.log('4. Squash any unecessary commits with rebase');
	console.log('5. push to YOUR repository branch ("git push origin staging")');
  console.log('6. Create pull request to master branch of upstream repo');
	console.log('\n');
	console.log('*****YOU DID IT******');
});
