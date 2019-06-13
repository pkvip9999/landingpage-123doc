var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');
var watch = require('gulp-watch');


gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-scss
        .pipe(gulp.dest('app/css'))
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('watch', function(){
    watch('app/scss/style.scss',[], function(){
        return gulp.src('app/scss/style.scss')
            .pipe(sass()) // Converts Sass to CSS with gulp-scss
            .pipe(gulp.dest('app/css'))
    });
    // Other watchers
    watch('app/*.html', browserSync.reload);
    watch('app/css/style.css', browserSync.reload);
    watch('app/js/**/*.js', browserSync.reload);
})
gulp.task('images', function(){
    return gulp.src('app/imgs/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})
gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});
gulp.task('clean:dist', function() {
    return del.sync('dist');
})
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})
gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})
gulp.task('default', function (callback) {
    runSequence(['sass','browserSync'],
                'watch',
                callback)
})