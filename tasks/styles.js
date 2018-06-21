'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

module.exports = function(options) {

  return function() {
    return combine(
        gulp.src(options.src, {since: gulp.lastRun(options.taskName)}),
        $.changed(options.dst),
        $.if(isDevelopment, $.sourcemaps.init()),
        $.sass({outputStyle: 'compressed'}),
        $.autoprefixer({browsers: ['last 2 versions']}),
        $.rename({ suffix: '.min' }),
        $.if(isDevelopment, $.sourcemaps.write('maps/')),
        gulp.dest(options.dst)
    ).on('error', $.notify.onError());
  };

};
