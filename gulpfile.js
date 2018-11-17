'use strict';

const dest = 'docs/'

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('styles', './tasks/styles.js', {
  src: 'src/sass/main.scss',
  dst: dest
});

lazyRequireTask('scripts', './tasks/scripts.js', {
  src: 'src/js/**/*.js',
  dst: dest
});

lazyRequireTask('assets', './tasks/assets.js', {
  src: 'src/assets/**',
  dst: dest
});

lazyRequireTask('clean', './tasks/clean.js', {dst: [dest+'*', '!'+dest+'/CNAME']});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts', 'assets'))
);