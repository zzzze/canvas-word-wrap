var chai = require('chai')
var wrap = require('../src/index.js')
var expect = chai.expect

describe('word wrap', function () {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var text = 'abc 123 一二三四五六七 abc 123 一二三四五六七 abc 123 一二三四五六七'

  it('should return correct count of lines', function () {
    expect(wrap(ctx, text, 20, 100, {lineClamp: 1}).length).to.equal(1)
    expect(wrap(ctx, text, 20, 100, {lineClamp: 2}).length).to.equal(2)
    expect(wrap(ctx, text, 20, 100, {lineClamp: 3}).length).to.equal(3)
  })

  it('should handle text overflow correctly', function () {
    var re = /\.{3}$/
    expect(function () {
      var result = wrap(ctx, text, 20, 100, {lineClamp: 1})
      return re.test(result[0])
    }()).to.be.ok

    expect(function () {
      var result = wrap(ctx, text, 20, 100, {lineClamp: 1, textOverflow: ''})
      return re.test(result[0])
    }()).to.not.be.ok

    expect(function () {
      var result = wrap(ctx, text, 20, 100, {lineClamp: 1, textOverflow: 'xyz'})
      return /xyz$/.test(result[0])
    }()).to.be.ok
  })

  // it('should return correct result', function () {
  //   expect(wrap(ctx, text, 20, 100, {lineClamp: 1})).to.eql(['abc 123...'])
  //   expect(wrap(ctx, text, 20, 100, {lineClamp: 2})).to.eql(['abc 123', '一二三四...'])
  // })

  // it('should handle word break correctly', function () {
  //   var text = 'abc 123 def abc 1234 ijk abc 123 xyz'
  //   expect(wrap(ctx, text, 20, 100, {lineClamp: 2})).to.eql(['abc 123', 'def abc...'])
  //   expect(wrap(ctx, text, 20, 100, {lineClamp: 2, wordBreak: 'break-all'})).to.eql(['abc 123 d', 'ef abc 1...'])
  // })
})

