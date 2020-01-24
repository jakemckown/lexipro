'use strict'

const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')

const INPUT_FILE = './lib/index.js'
const OUTPUT_FILE = './dist/lexipro.js'

const isProduction = process.env.NODE_ENV === 'production'

exports.default = (async () => ({
  input: INPUT_FILE,
  output: {
    file: OUTPUT_FILE,
    format: 'umd',
    name: 'Preprocessor'
  },
  plugins: [
    commonjs(),
    resolve(),
    isProduction && (await require('rollup-plugin-terser')).terser(),
    !isProduction && (await require('rollup-plugin-visualizer'))({
      filename: './visualizer.html',
      title: 'LexiPro',
      template: 'sunburst'
    })
  ]
}))()
