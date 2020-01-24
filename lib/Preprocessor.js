'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preprocessor = Preprocessor;

var _lex = _interopRequireDefault(require("lex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NEXT_CHAR = /./;
var lexer = new _lex["default"]();

function Preprocessor() {
  if (!(this instanceof Preprocessor)) {
    return new Preprocessor();
  }
}

Preprocessor.prototype.addRule = function (pattern, action) {
  lexer.addRule(pattern, function (lexeme) {
    var token = action(lexeme);
    return token;
  });
  return this;
};

Preprocessor.prototype.preprocess = function (src) {
  lexer.addRule(NEXT_CHAR, function (lexeme) {
    return lexeme;
  });
  lexer.setInput(src);
  var tokens = [];

  while (lexer.index < src.length) {
    try {
      var token = lexer.lex();
      tokens.push(token);
    } catch (error) {
      throw error;
    }
  }

  return tokens.filter(function (token) {
    return token !== null;
  }).join('');
};