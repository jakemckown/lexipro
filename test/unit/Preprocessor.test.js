/* eslint-env jest */

const { Preprocessor } = require('../../lib/Preprocessor.js')

describe('Preprocessor', () => {
  it('Should be defined', () => {
    expect(Preprocessor).toBeDefined()
  })

  describe('Preprocessor instance', () => {
    it('Should be defined with "new"', () => {
      const pp = new Preprocessor()
      
      expect(pp).toBeDefined()
    })

    it('Should be defined without "new"', () => {
      const pp = Preprocessor()
      
      expect(pp).toBeDefined()
    })

    it('Should have method "addRule"', () => {
      const pp = new Preprocessor()
      
      expect(pp).toHaveProperty('addRule')
      expect(pp.addRule).toBeInstanceOf(Function)
    })

    it('Should have method "preprocess"', () => {
      const pp = new Preprocessor()
      
      expect(pp).toHaveProperty('preprocess')
      expect(pp.preprocess).toBeInstanceOf(Function)
    })

    it('Should allow a rule to replace tokens', () => {
      const pp = new Preprocessor()
      const pattern = /J/
      const src = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const dest = 'ABCDEFGHI j KLMNOPQRSTUVWXYZ'

      pp.addRule(pattern, () => {
        return ' j '
      })
      
      expect(pp.preprocess(src)).toBe(dest)
    })

    it('Should allow a rule to define new rules', () => {
      const pp = new Preprocessor()
      const pattern = /#define\s+(\w+)\s+([^;])[;\n]\s*/i
      const src = '#define TEST 1; var x = TEST; return x;'
      const dest = 'var x = 1; return x;'

      pp.addRule(pattern, (statement, name, value) => {
        pp.addRule(new RegExp(name), () => {
          return value
        })
      
        return ''
      })
      
      expect(pp.preprocess(src)).toBe(dest)
    })
  })
})
