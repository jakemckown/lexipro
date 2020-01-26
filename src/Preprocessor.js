'use strict'

import Lexer from 'lex'

export function Preprocessor () {
  if (!(this instanceof Preprocessor)) {
    return new Preprocessor()
  }

  const lexer = new Lexer((char) => char)

  this.addRule = function (pattern, action) {
    lexer.addRule(pattern, action)
  
    return this
  }

  this.preprocess = function (src) {
    lexer.setInput(src)
  
    const tokens = []
  
    while (lexer.index < src.length) {
      const token = lexer.lex()
      
      tokens.push(token)
    }
  
    return tokens.filter((token) => token !== null).join('')
  }

  Object.defineProperty(this, 'index', {
    get: () => lexer.index,
    enumerable: true
  })
}
