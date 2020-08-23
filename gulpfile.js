'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let watch = require('gulp-watch');
let rename = require('gulp-rename');
let svgstore = require('gulp-svgstore');
let svgmin = require('gulp-svgmin');
let svginject = require('gulp-inject');
let browserSync = require('browser-sync').create();

function styleScss(done){
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded',errorLogToConsole:true}))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({cascade:false }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream());
  done();
}

function sync (done){
  browserSync.init({
    server:{
      baseDir:'./src'
    },
    host: "192.168.0.107",
    port:3000
  });
  done();
}

function watchFiles(done){
  gulp.watch('./src/**/*.scss',styleScss);
  gulp.watch('./src/*.html',browserSync.reload);
  done();
}

function createSprite(done) {
  gulp.src('./src/assets/img/svg/icon-*.svg')
  .pipe(svgstore())
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('./src/assets/img/svg'))
  done();
}

function buildcreation (done) {
  gulp.src([
    './src/**/*.{svg,jpg,png}',
    './src/**/*.js',
    './src/**/*.html'
  ])
  .pipe(gulp.dest('./build/'));
  done();
}

gulp.task('default',gulp.parallel(watchFiles,sync));




