/*
 *@description:
  实现一个串行执行promise的函数
 *@author: codeWen666
 *@date: 2021-10-23 13:31:56
 *@version: V1.0.5
*/
function sequence (promises) {
  const result = []
  let p = Promise.resolve()
  const then = (promise) => {
    p = p.then(() => {
      return promise().then((data) => {
        result.push(data)
      })
    })
  }
  promises.forEach((item) => {
    then(item)
  })
  return p.then(() => result)
}

function createPromise (time, order) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('order-->', order)
        resolve(order)
      }, time)
    })
  }
}

const arr = [createPromise(1000, 1), createPromise(1000, 2), createPromise(1000, 3), createPromise(1000, 4)]
const last = sequence(arr)
last.then((val) => {
  console.log('last->', val)
})

// 输出结果 每秒依次输出
// order--> 1
// order--> 2
// order--> 3
// order--> 4
// last-> [ 1, 2, 3, 4 ]
