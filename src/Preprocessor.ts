'use strict'

import Lexer from 'lex'

export default function createPreprocessor(): any {
  const lexer = new Lexer((char: string) => char)

  class Preprocessor {
    get index(): number {
      return lexer.index
    }
  
    addRule(pattern: RegExp, action: CallableFunction): Preprocessor {
      lexer.addRule(pattern, action)
  
      return this
    }
  
    preprocess(src: string): string {
      lexer.setInput(src)
  
      const tokens = []
  
      while (lexer.index < src.length) {
        const token = lexer.lex()
  
        tokens.push(token)
      }
  
      return tokens.filter((token) => token !== null).join('')
    }
  }

  return new Preprocessor()
}
