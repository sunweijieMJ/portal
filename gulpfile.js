const gulp = require('gulp');
// 插件
const connect = require('gulp-connect');
const revCollector = require('gulp-rev-collector');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const babel = require('gulp-babel');
const cssmin = require('gulp-minify-css');
const tinypng = require('gulp-tinypng-nokey');
const autoprefixer = require('gulp-autoprefixer');

// connect启动服务
gulp.task('server', () => {
  connect.server({
    root: 'dist',
    port: 8888,
    livereload: true
  });
});
// 监测文件发生变化
gulp.task('watch', () => {
  gulp.watch('assets/img/**/*', ['images']);
  gulp.watch('assets/**/*.scss', ['scss']);
  gulp.watch('assets/**/*.js', ['javascript', 'browserify']);
  gulp.watch(['*.html'], ['html', 'rev']);
});

// 图片
gulp.task('images', () => {
  return gulp.src(['assets/img/**/*.{png,jpg,jpeg,svg}'])
    .pipe(tinypng())
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(connect.reload());
});
// html+ico
gulp.task('html', () => {
  return gulp.src(['*.html', '*.ico'])
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});
// manifest
gulp.task('rev', ['html'], () => {
  return gulp.src(['rev/**/*.json', 'dist/*.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});
// scss
gulp.task('scss', () => {
  return gulp.src('assets/**/*.scss')
    .pipe(rev())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/assets'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/css'))
    .pipe(connect.reload());
});
// js(同步执行时需要return)
gulp.task('javascript', () => {
  return gulp.src('assets/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/assets'))
    .pipe(connect.reload());
});

// 默认指令开启server和watch指令
gulp.task('default', ['server', 'watch']);

// browserify
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', ['javascript'], () => {
  return browserify({
    entries: 'dist/assets/js/main.js',
    debug: true
  }).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});