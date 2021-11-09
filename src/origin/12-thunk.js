const fs = require('fs')
// const thunkFile = Thunk(fs.readFile)

// thunkFile('../assets/test.txt')((err, data) => {
//   console.log('读取异步数据->>')
//   console.log(data.toString('utf-8'))
// })

// function Thunk (fn) {
//   return function () {
//     const args = Array.from(arguments)
//     return function (callback) {
//       args.push(callback)
//       fn.apply(this, args)
//     }
//   }
// }
function readFile (name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, (err, data) => {
      if (err)reject(err)
      resolve(data)
    })
  })
}
const co = require('co')
co(function * () {
  const result1 = yield readFile('../assets/test1.txt') // fs.readFile('../assets/test.txt')
  const result2 = yield [1, 2, 3] // fs.readFile('../assets/test.txt')
  return [result1.toString('utf-8'), result2.toString('utf-8')]
}).then(function (val) {
  console.log('success', val)
}).catch((e) => {
  console.log('err->', e)
})
