'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var embedlr = require('gulp-embedlr');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
//var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
//var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');

var isProd = (gutil.env.type === 'production');

gulp.task('scripts', function() {
    var browserifyOpts = {
        debug: !isProd
    };
    
    gulp.src(['./src/scripts/app.js'])
        .pipe(browserify(browserifyOpts))
        .pipe(isProd ? uglify() : gutil.noop())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(livereload());
});

gulp.task('styles', function() {
    gulp.src(['./src/styles/app.less'])
        .pipe(less())
        .pipe(isProd ? minifyCSS() : gutil.noop())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(livereload());
});

gulp.task('markup', function() {
    gulp.src(['./src/**/*.html'])
        .pipe(!isProd ? embedlr() : gutil.noop())
//        .pipe(isProd ? minifyHTML() : gutil.noop())
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('images', function () {
    gulp.src(['./src/**/*.jpg', './src/**/*.png'])
//        .pipe(isProd ? imagemin() : gutil.noop())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('fonts', function() {
    gulp.src(['./node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('lint', function() {
    gulp.src(['./src/scripts/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
    gulp.src('./dist/', {read: false})
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.html'], ['markup']);
    gulp.watch(['./src/scripts/**/*.js'], ['scripts']);
    gulp.watch(['./src/styles/**/*.less'], ['styles']);
});

gulp.task('default', ['markup', 'scripts', 'styles', 'images', 'fonts', 'watch']);
