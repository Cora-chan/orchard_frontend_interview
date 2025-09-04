const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', buildStyles);
}

exports.default = gulp.series(buildStyles, watchFiles);
