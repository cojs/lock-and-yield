
# Lock and Yield

For asynchronous functions. Per given key, only executes one underlying function at a time (such as API call).

## API

```js
var lock = require('lock-and-yield')

var fn = lock(function* (url) {
  return yield request(url)
}, function (url) {
  return url
})

// only 1 HTTP request will be called:
co(function* () {
  yield [
    fn(url),
    fn(url),
  ]
})()
```

### fn = lock(fn, hashfn)

`fn` is a `GeneratorFunction`. `hashfn` is a hashing function based on the arguments passed to `fn`. By default, it is `(arg) -> String(arg)`.

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.