'use strict'

// PREPROCESSOR
const Preprocessor = require('../lib/index.js')

const repl = require('repl').start()

repl.context.Preprocessor = Preprocessor

Object.defineProperty(repl.context, 'exit', {
  enumerable: true,
  get: () => process.exit(0)
})

Object.defineProperty(repl.context, 'quit', {
  enumerable: true,
  get: () => repl.context.exit
})
