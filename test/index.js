var co = require('co')
var assert = require('assert')

var lock = require('..')

describe('lock and yield', function () {
  it('should work', co(function* () {
    var calls = 0
    var fn = lock(function* fn(url, timeout) {
      calls++
      yield wait(timeout || 10)

      return timeout
    })

    var result = yield [
      fn('a', 0),
      fn('a', 1),
      fn('a', 2),
      fn('a', 3),
      fn('a', 4),
    ]

    assert.equal(calls, 1)
    assert.equal(result.join(""), "00000")
  }))
})

function wait(ms) {
  return function (done) {
    setTimeout(done, ms)
  }
}
