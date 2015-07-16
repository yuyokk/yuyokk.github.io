var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var server = require('gulp-server-livereload');

var paths = {
  sassEntryPoint: '_sass/main.scss',
  css: 'css/',
  sass: '_sass/**/*.scss',
  images: 'images/**/*',
  pages: [
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_posts/**/*',
    '*.md'
  ]
};

gulp.task('sass', function() {
  return gulp.src(paths.sassEntryPoint)
    .pipe(sass())
    .pipe(minifycss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.css));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('images'));
});

gulp.task('build', shell.task(['jekyll build']));

// run the server on http://localhost:8000
gulp.task('webserver', function() {
  gulp.src('_site')
    .pipe(server({
      livereload: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass', 'build']);
  gulp.watch(paths.pages, ['build']);
});

gulp.task('default', ['images', 'sass', 'build', 'webserver', 'watch']);
