"use strict";
const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('js', ()=>{

    return gulp.src('src/**/*.js')
        .pipe(concat('pancakes.js'))
        .pipe(gulp.dest('build'));

});


gulp.task('build', ['js']);


gulp.task('watch', ()=>{

    gulp.watch('src/**/*.js', ['build']);

});

gulp.task('default', ['build', 'watch']);