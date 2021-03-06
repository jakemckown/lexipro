(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Preprocessor = factory());
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var lexer = createCommonjsModule(function (module) {
	{ module.exports = Lexer; }

	Lexer.defunct = function (chr) {
	    throw new Error("Unexpected character at index " + (this.index - 1) + ": " + chr);
	};

	function Lexer(defunct) {
	    if (typeof defunct !== "function") { defunct = Lexer.defunct; }

	    var tokens = [];
	    var rules = [];
	    var remove = 0;
	    this.state = 0;
	    this.index = 0;
	    this.input = "";

	    this.addRule = function (pattern, action, start) {
	        var global = pattern.global;

	        if (!global) {
	            var flags = "g";
	            if (pattern.multiline) { flags += "m"; }
	            if (pattern.ignoreCase) { flags += "i"; }
	            pattern = new RegExp(pattern.source, flags);
	        }

	        if (Object.prototype.toString.call(start) !== "[object Array]") { start = [0]; }

	        rules.push({
	            pattern: pattern,
	            global: global,
	            action: action,
	            start: start
	        });

	        return this;
	    };

	    this.setInput = function (input) {
	        remove = 0;
	        this.state = 0;
	        this.index = 0;
	        tokens.length = 0;
	        this.input = input;
	        return this;
	    };

	    this.lex = function () {
	        if (tokens.length) { return tokens.shift(); }

	        this.reject = true;

	        while (this.index <= this.input.length) {
	            var matches = scan.call(this).splice(remove);
	            var index = this.index;

	            while (matches.length) {
	                if (this.reject) {
	                    var match = matches.shift();
	                    var result = match.result;
	                    var length = match.length;
	                    this.index += length;
	                    this.reject = false;
	                    remove++;

	                    var token = match.action.apply(this, result);
	                    if (this.reject) { this.index = result.index; }
	                    else if (typeof token !== "undefined") {
	                        switch (Object.prototype.toString.call(token)) {
	                        case "[object Array]":
	                            tokens = token.slice(1);
	                            token = token[0];
	                        default:
	                            if (length) { remove = 0; }
	                            return token;
	                        }
	                    }
	                } else { break; }
	            }

	            var input = this.input;

	            if (index < input.length) {
	                if (this.reject) {
	                    remove = 0;
	                    var token = defunct.call(this, input.charAt(this.index++));
	                    if (typeof token !== "undefined") {
	                        if (Object.prototype.toString.call(token) === "[object Array]") {
	                            tokens = token.slice(1);
	                            return token[0];
	                        } else { return token; }
	                    }
	                } else {
	                    if (this.index !== index) { remove = 0; }
	                    this.reject = true;
	                }
	            } else if (matches.length)
	                { this.reject = true; }
	            else { break; }
	        }
	    };

	    function scan() {
	        var matches = [];
	        var index = 0;

	        var state = this.state;
	        var lastIndex = this.index;
	        var input = this.input;

	        for (var i = 0, length = rules.length; i < length; i++) {
	            var rule = rules[i];
	            var start = rule.start;
	            var states = start.length;

	            if ((!states || start.indexOf(state) >= 0) ||
	                (state % 2 && states === 1 && !start[0])) {
	                var pattern = rule.pattern;
	                pattern.lastIndex = lastIndex;
	                var result = pattern.exec(input);

	                if (result && result.index === lastIndex) {
	                    var j = matches.push({
	                        result: result,
	                        action: rule.action,
	                        length: result[0].length
	                    });

	                    if (rule.global) { index = j; }

	                    while (--j > index) {
	                        var k = j - 1;

	                        if (matches[j].length > matches[k].length) {
	                            var temple = matches[j];
	                            matches[j] = matches[k];
	                            matches[k] = temple;
	                        }
	                    }
	                }
	            }
	        }

	        return matches;
	    }
	}
	});

	function createPreprocessor() {
	    var lexer$1 = new lexer(function (char) { return char; });
	    var Preprocessor = function Preprocessor () {};

	    var prototypeAccessors = { index: { configurable: true } };

	    prototypeAccessors.index.get = function () {
	        return lexer$1.index;
	    };
	    Preprocessor.prototype.addRule = function addRule (pattern, action) {
	        lexer$1.addRule(pattern, action);
	        return this;
	    };
	    Preprocessor.prototype.preprocess = function preprocess (src) {
	        lexer$1.setInput(src);
	        var tokens = [];
	        while (lexer$1.index < src.length) {
	            var token = lexer$1.lex();
	            tokens.push(token);
	        }
	        return tokens.filter(function (token) { return token !== null; }).join('');
	    };

	    Object.defineProperties( Preprocessor.prototype, prototypeAccessors );
	    return new Preprocessor();
	}

	return createPreprocessor;

})));
