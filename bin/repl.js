'use strict'

// PREPROCESSOR
const Preprocessor = require('../lib/index.js')

const preprocessor = new Preprocessor()

// PATTERN
const DEFINE_PATTERN = /#define\s+([a-z_@#$&;.?][\w@#$&;.?]*)\s+([^;])[;\n]/i

// INPUT
const src = '#define TEST 1; var x = TEST; return x;'

// OUTPUT
const dest = ' var x = 1; return x;'

preprocessor.addRule(DEFINE_PATTERN, (match, addRule) => {
  const name = match[1]
  const value = match[2]

  addRule(new RegExp(name), (match) => {
    return value
  })

  return ''
})

const repl = require('repl').start()

repl.context.Preprocessor = Preprocessor
repl.context.preprocessor = preprocessor
repl.context.preprocess = preprocessor.preprocess
repl.context.DEFINE_PATTERN = DEFINE_PATTERN
repl.context.src = src
repl.context.dest = dest

Object.defineProperty(repl.context, 'exit', {
  enumerable: true,
  get: () => process.exit(0)
})

Object.defineProperty(repl.context, 'quit', {
  enumerable: true,
  get: () => repl.context.exit
})
