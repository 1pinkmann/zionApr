const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;

gulp.task('sass-compile', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'));
})

gulp.task('html', async function () {
    gulp.src('./html/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('allCars', async function () {
    gulp.src('./all-cars-templates/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./all-cars'));
});

gulp.task('minify-css', () => {
    return gulp.src('./css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css/minified/'));
});

gulp.task('compress', function () {
    return pipeline(
        gulp.src('./js/*.js'),
        uglify(),
        gulp.dest('./js/minified/')
    );
});

gulp.task('watch', function () {
    gulp.watch('./html/**/*.html', gulp.series('html'));
    gulp.watch('./all-cars-templates/**/*.html', gulp.series('allCars'));
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'));
    gulp.watch('./css/style.css', gulp.series('minify-css'));
    gulp.watch('./js/*.js', gulp.series('compress'));
})