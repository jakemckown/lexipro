<h1 align="center">LexiPro</h1>
<p align="center">Lexical preprocessor for any source text, customizable for your needs</p>
<br>

## Quick Start

```node
const Preprocessor = require('lexipro')

const pp = new Preprocessor()

pp.addRule(/#define\s+(\w+)\s+([^;])[;\n]\s*/i, (match, name, value) => {
  pp.addRule(new RegExp(name), () => {
    return value
  })

  return ''
})

pp.preprocess('#define TEST 1; var x = TEST; return x;') // 'var x = 1; return x;'
```

## Installation

#### NPM
```
$ npm i lexipro
```

#### Yarn
```
$ yarn add lexipro
```
