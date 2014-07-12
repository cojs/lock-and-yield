module.exports = function lockAndYield(fn, hashfn) {
  hashfn = hashfn || defaultHashFn
  var cache = Object.create(null)

  return function* () {

    var key = hashfn.apply(this, arguments)

    if (cache[key] && cache[key].state) {
      // in progress, wait until it's called
      return yield await(key)
    }

    cache[key] = { waits: [], state: true }

    var res = yield* fn.apply(this, arguments)

    // finish waits
    cache[key].waits.forEach(function(fn){ fn(res) })
    delete cache[key]

    return res
  }

  function await(key) {
    return function (done) {
      cache[key]['waits'].push(function(result){
        done(null, result)
      })
    }
  }
}

function defaultHashFn() {
  return String.call(arguments[0])
}
