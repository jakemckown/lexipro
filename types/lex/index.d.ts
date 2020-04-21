declare module 'lex' {
  export default class Lexer {
    state: number
    index: number
    input: string
    constructor(defunct?: CallableFunction)
    addRule(pattern: RegExp, action: CallableFunction, start?: Array<number>): Lexer
    setInput(input: string): Lexer
    lex(): string
  }
}
