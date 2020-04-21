'use strict';
import Lexer from 'lex';
export default function createPreprocessor() {
    const lexer = new Lexer((char) => char);
    class Preprocessor {
        get index() {
            return lexer.index;
        }
        addRule(pattern, action) {
            lexer.addRule(pattern, action);
            return this;
        }
        preprocess(src) {
            lexer.setInput(src);
            const tokens = [];
            while (lexer.index < src.length) {
                const token = lexer.lex();
                tokens.push(token);
            }
            return tokens.filter((token) => token !== null).join('');
        }
    }
    return new Preprocessor();
}
//# sourceMappingURL=Preprocessor.js.map