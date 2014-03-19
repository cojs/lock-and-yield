
var EventEmitter = require('events').EventEmitter

module.exports = function lockAndYield(fn, hashfn) {
  hashfn = hashfn || defaultHashFn
  var state = Object.create(null)
  var ee = new EventEmitter({
    maxListeners: Infinity
  })

  return function* () {
    var key = hashfn.apply(this, arguments)
    // in progress, wait until it's called
    if (state[key]) return yield await(key)
    state[key] = true
    var res = yield* fn.apply(this, arguments)
    delete state[key]
    ee.emit(key, res)
    return res
  }

  function await(event) {
    return function (done) {
      ee.once(event, done.bind(null, null))
    }
  }
}

function defaultHashFn() {
  return String.call(arguments[0])
}