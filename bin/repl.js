'use strict'

// PREPROCESSOR
const Preprocessor = require('../index.js')

const preprocessor = new Preprocessor()

// PATTERN
const DEFINE_PATTERN = /#define\s+([a-z_@#$&;.?][\w@#$&;.?]*)\s+([^;])[;\n]\s*/i

// INPUT
const src = '#define TEST 1; var x = TEST; return x;'

// OUTPUT
const dest = 'var x = 1; return x;'

preprocessor.addRule(DEFINE_PATTERN, (lexeme, name, value) => {
  preprocessor.addRule(new RegExp(name), () => {
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
