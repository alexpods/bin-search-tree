var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sweetjs    = require('gulp-sweetjs');
var uglify     = require('gulp-uglify');

gulp.task("build", function() {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(sweetjs({
            modules: [
                './macros/TRAVERSE_IN_ORDER_LEFT.sjs',
                './macros/TRAVERSE_IN_ORDER_RIGHT.sjs'
            ]
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});