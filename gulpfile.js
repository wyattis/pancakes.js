"use strict";
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


gulp.task('minify-js', () => {

    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('pancakes.min.js'))
        .pipe(gulp.dest('build'));

});


gulp.task('es5-js', () => {

    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('pancakes.es5.js'))
        .pipe(gulp.dest('build'));

});

gulp.task('js', ()=>{

    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('pancakes.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build'));

});


gulp.task('build-test', ['build'], ()=>{

    return gulp.src(['tests/strict.js', 'build/pancakes.js', 'tests/export.js'])
        .pipe(concat('pancakes.test.js'))
        .pipe(gulp.dest('build'));

});

gulp.task('build', ['js']);

gulp.task('build-full', ['build-test', 'es5-js', 'minify-js']);

gulp.task('watch-full', ()=>{

    gulp.watch('src/**/*.js', ['build-test', 'build-full']);

});

gulp.task('watch', ()=>{

    gulp.watch('src/**/*.js', ['build-test']);

});

gulp.task('default', ['build-full', 'watch']);