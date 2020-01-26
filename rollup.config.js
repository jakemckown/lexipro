'use strict'

import buble from '@rollup/plugin-buble'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import visualize from 'rollup-plugin-visualizer'

const name = 'LexiPro'
const input = './src/Preprocessor.js'

const visualizerOptions = {
  title: name,
  filename: './visualizer.html',
  template: 'sunburst'
}

export default [
  {
    input,
    output: {
      name,
      file: 'dist/lexipro.js',
      format: 'umd'
    },
    plugins: [
      buble(),
      resolve(),
      commonjs(),
      visualize(visualizerOptions)
    ]
  },
  {
    input,
    output: {
      file: 'dist/lexipro.min.js',
      format: 'umd',
      indent: false,
      name
    },
    plugins: [
      buble(),
      resolve(),
      commonjs(),
      terser()
    ]
  }
]
