'use strict'

import Lexer from 'lex'

const NEXT_CHAR = /./

const lexer = new Lexer()

export function Preprocessor () {
  if (!(this instanceof Preprocessor)) {
    return new Preprocessor()
  }
}

Preprocessor.prototype.addRule = function (pattern, action) {
  lexer.addRule(pattern, (lexeme) => {
    const match = new RegExp(pattern).exec(lexeme)
    const token = action(match, Preprocessor.prototype.addRule)

    return token
  })

  return this
}

Preprocessor.prototype.preprocess = function (src) {
  lexer.addRule(NEXT_CHAR, (lexeme) => {
    return lexeme
  })

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
