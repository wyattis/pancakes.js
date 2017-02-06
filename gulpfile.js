"use strict";
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('js', ()=>{

    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('pancakes.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build'));

});


gulp.task('build-full', ['build'], ()=>{

    return gulp.src(['tests/strict.js', 'build/pancakes.js', 'tests/export.js'])
        .pipe(concat('pancakes.test.js'))
        .pipe(gulp.dest('build'));

});

gulp.task('build', ['js']);

gulp.task('watch', ()=>{

    gulp.watch('src/**/*.js', ['build-full']);

});

gulp.task('default', ['build-full', 'watch']);