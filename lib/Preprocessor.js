'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preprocessor = Preprocessor;

var _lex = _interopRequireDefault(require("lex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Preprocessor() {
  if (!(this instanceof Preprocessor)) {
    return new Preprocessor();
  }

  var lexer = new _lex["default"](function (_char) {
    return _char;
  });

  this.addRule = function (pattern, action) {
    lexer.addRule(pattern, action);
    return this;
  };

  this.preprocess = function (src) {
    lexer.setInput(src);
    var tokens = [];

    while (lexer.index < src.length) {
      var token = lexer.lex();
      tokens.push(token);
    }

    return tokens.filter(function (token) {
      return token !== null;
    }).join('');
  };

  Object.defineProperty(this, 'index', {
    get: function get() {
      return lexer.index;
    },
    enumerable: true
  });
}