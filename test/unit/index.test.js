/* eslint-env mocha */

import { expect } from 'chai'
import Preprocessor from '../../index.js'

describe('lexipro', () => {
  it('Should be a function', () => {
    expect(Preprocessor).to.be.a('function')
  })
})
