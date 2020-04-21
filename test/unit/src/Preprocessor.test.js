/* eslint-env mocha */

import { expect } from 'chai'
import Preprocessor from '../../../lib/Preprocessor.js'

describe('Preprocessor', () => {
  it('Should be a function', () => {
    expect(Preprocessor).to.be.a('function')
  })

  describe('Preprocessor instance', () => {
    it('Should be instantiated without "new"', () => {
      const pp = Preprocessor()

      expect(pp).to.be.an('object')
    })

    it('Should have method "addRule"', () => {
      const pp = Preprocessor()

      expect(pp).to.have.property('addRule')
      expect(pp.addRule).to.be.a('function')
    })

    it('Should have method "preprocess"', () => {
      const pp = Preprocessor()

      expect(pp).to.have.property('preprocess')
      expect(pp.preprocess).to.be.a('function')
    })

    it('Should allow a rule to replace tokens', () => {
      const pp = Preprocessor()
      const pattern = /J/
      const src = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const dest = 'ABCDEFGHI j KLMNOPQRSTUVWXYZ'

      pp.addRule(pattern, () => {
        return ' j '
      })

      expect(pp.preprocess(src)).to.equal(dest)
    })

    it('Should allow a rule to define new rules', () => {
      const pp = Preprocessor()
      const pattern = /#define\s+(\w+)\s+([^;])[;\n]\s*/i
      const src = '#define TEST 1; var x = TEST; return x;'
      const dest = 'var x = 1; return x;'

      pp.addRule(pattern, (statement, name, value) => {
        pp.addRule(new RegExp(name), () => {
          return value
        })

        return ''
      })

      expect(pp.preprocess(src)).to.equal(dest)
    })

    it('Should allow a rule to access its current index', () => {
      const pp = Preprocessor()
      const pattern = /I/
      const src = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const dest = 'ABCDEFGH 9 JKLMNOPQRSTUVWXYZ'

      pp.addRule(pattern, () => {
        return ` ${pp.index} `
      })

      expect(pp.preprocess(src)).to.equal(dest)
    })
  })
})
