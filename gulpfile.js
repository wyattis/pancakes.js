"use strict";
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const gulpDocumentation = require('gulp-documentation');

const buildPath = 'public/build';

gulp.task('minify-js', () => {

    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('pancakes.min.js'))
        .pipe(gulp.dest(buildPath));

});


gulp.task('es5-js', () => {

    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('pancakes.es5.js'))
        .pipe(gulp.dest(buildPath));

});

gulp.task('js', ()=>{

    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('pancakes.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(buildPath));

});


gulp.task('build-test', ['build'], ()=>{

    return gulp.src(['tests/strict.js', 'build/pancakes.js', 'tests/export.js'])
        .pipe(concat('pancakes.test.js'))
        .pipe(gulp.dest(buildPath));

});



gulp.task('docs', ['build'], ()=>{

    gulp.src('src/main.js')
        .pipe(gulpDocumentation('html', {}, require('./package')))
        .pipe(gulp.dest('docs'));

    // gulp.src('src/**/*.js')
    //     .pipe(gulpDocumentation('html', {access: ['private'], sortOrder: 'alpha'}, require('./package')))
    //     .pipe(gulp.dest('docs/private'));

});



gulp.task('sass', () => {

    gulp.src('static/**/*.{sass,scss,css}')
        .pipe(sass())
        .pipe(gulp.dest('public'));

});


gulp.task('build', ['sass', 'js']);

gulp.task('build-full', ['build-test', 'es5-js', 'minify-js']);

gulp.task('watch-full', ()=>{

    gulp.watch('src/**/*.js', ['build-test', 'build-full']);

});

gulp.task('watch', ()=>{

    gulp.watch('src/**/*.js', ['build-test']);

});

gulp.task('default', ['build-full', 'watch']);