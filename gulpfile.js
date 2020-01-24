'use strict'

const { task, series, src, dest } = require('gulp')
const del = require('del')
const babel = require('gulp-babel')

const SRC = './src'
const LIB = './lib'
const DIST = './dist'
const JS = '/**/*.js'

const babelOptions = {
  presets: ['@babel/preset-env']
}

task('default', series(
  clean,
  compileJS
))

function clean () {
  return del([LIB, DIST])
}

function compileJS () {
  return src(SRC + JS)
    .pipe(babel(babelOptions))
    .pipe(dest(LIB))
}
