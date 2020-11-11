'use strict';

var gulp = require('gulp');

var del = require('del');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var autoprefixer = require('gulp-autoprefixer');

var watch = require('gulp-watch');

var rename = require('gulp-rename');

var svgstore = require('gulp-svgstore');

var svgmin = require('gulp-svgmin');

var _require = require('gulp'),
    src = _require.src;

var browserSync = require('browser-sync').create();

function styleScss(done) {
  gulp.src('./src/scss/**/*.scss').pipe(sourcemaps.init()).pipe(sass({
    outputStyle: 'compressed',
    errorLogToConsole: true
  })).on('error', console.error.bind(console)).pipe(autoprefixer({
    cascade: false
  })).pipe(sourcemaps.write('./')).pipe(gulp.dest('./src/css/')).pipe(browserSync.stream());
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    host: "192.168.0.107",
    port: 3000
  });
  done();
}

function watchFiles(done) {
  gulp.watch('./src/**/*.scss', styleScss);
  gulp.watch('./src/*.html', browserSync.reload);
  done();
}

function createSprite(done) {
  gulp.src('./src/assets/img/svg/icon-*.svg').pipe(svgstore()).pipe(rename('sprite.svg')).pipe(gulp.dest('./src/assets/img/svg'));
  done();
}

function buildProduction(done) {
  return gulp.src(['./src/**/*.{svg,png,jpg}', './src/**/*.js', './src/**/*.{css,map}', './src/**/*.html']).pipe(gulp.dest('./build/'));
}

function minimizeSvg(done) {
  gulp.src('./build/**/*.svg').pipe(svgmin()).pipe(gulp.dest('./build/')).pipe(svgstore()).pipe(rename('sprite.svg')).pipe(gulp.dest('./build/assets/img/svg'));
  done();
}

gulp.task('default', gulp.parallel(watchFiles, sync));
gulp.task('create-sprite', gulp.series(createSprite));
gulp.task('build', gulp.series(buildProduction, minimizeSvg));
gulp.task('build-css', gulp.series(styleScss));