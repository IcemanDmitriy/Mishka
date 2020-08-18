'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let watch = require('gulp-watch');
// let stripCssComments = require('gulp-strip-css-comments');
let browserSync = require('browser-sync').create();

function styleScss(done){
  gulp.src('./src/scss/**/*.scss')
    // .pipe(rename('main.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded',errorLogToConsole:true}))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({cascade:false }))
    .pipe(sourcemaps.write('./'))
    // .pipe(stripCssComments())
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

gulp.task('default',gulp.parallel(watchFiles,sync));





