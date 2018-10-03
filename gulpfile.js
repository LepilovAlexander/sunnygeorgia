let gulp = require('gulp');
let browserSync = require('browser-sync');
let rename = require('gulp-rename');
let less = require('gulp-less');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let concatCSS = require('gulp-concat-css');
let autopolyfiller = require('gulp-autopolyfiller');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let htmlmin = require('gulp-htmlmin');


// Static server
gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("src/less/*.less", [less]);
  gulp.watch("src/*.html").on('change', browserSync.reload);;
});
//Less
gulp.task('less', () => {
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(concatCSS('style.css'))
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});
// HTML
gulp.task('minify', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});
// JS
gulp.task('script', () => {
  return gulp.src('src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});
