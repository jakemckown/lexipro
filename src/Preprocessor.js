'use strict'

import Lexer from 'lex'

const lexer = new Lexer((char) => char)

export function Preprocessor () {
  if (!(this instanceof Preprocessor)) {
    return new Preprocessor()
  }
}

Preprocessor.prototype.addRule = function (pattern, action) {
  lexer.addRule(pattern, action)

  return this
}

Preprocessor.prototype.preprocess = function (src) {
  lexer.setInput(src)

  const tokens = []

  while (lexer.index < src.length) {
    try {
      const token = lexer.lex()

      tokens.push(token)
    } catch (error) {
      throw error
    }
  }

  return tokens.filter((token) => token !== null).join('')
}
