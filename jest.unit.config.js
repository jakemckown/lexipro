'use strict'

module.exports = {
  collectCoverage: true,
  coverageDirectory: './coverage/unit',
  coverageReporters: [
    'lcov',
    'text-summary',
    'text'
  ],
  roots: [
    './test/unit'
  ],
  verbose: true
}
