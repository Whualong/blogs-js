### promise的实现

- then
- catch
- finally
- Promise.resolve
- Promise.reject
- Promise.all
- Promise.race
- Promise.allSettled

```js

/*
 *@description: implement promise && pass promise A+ 872 tests
  加入异步微任务队列的实现使用的 queueMicrotask 底层API
  不建议使用setTimeout 宏任务
 *@author: codeWen666
 *@date: 2021-10-22 00:57:06
 *@version: V1.0.5
*/
const PENDIGN = 'pending'
const FUFILLED = 'fufilled'
const REJECTED = 'rejected'
class Promise {
  constructor (exec) {
    this.status = PENDIGN
    this.value = undefined
    this.reason = undefined
    this.resolveCallback = []
    this.rejectCallback = []
    const resolve = (val) => {
      if (this.status === PENDIGN) {
        this.status = FUFILLED
        this.value = val
        this.resolveCallback.forEach((fn) => {
          fn()
        })
      }
    }
    const reject = (val) => {
      if (this.status === PENDIGN) {
        this.status = REJECTED
        this.reason = val
        this.rejectCallback.forEach((fn) => {
          fn()
        })
      }
    }

    try {
      exec(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (onResolve, onReject) {
    onResolve = typeof onResolve === 'function' ? onResolve : (val) => val
    onReject = typeof onReject === 'function' ? onReject : (err) => { throw err }
    const newP = new Promise((resolve, reject) => {
      const queueResolveTask = () => {
        queueMicrotask(() => {
          try {
            const x = onResolve(this.value)
            resolvePromise(newP, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      const queueRejectTask = () => {
        queueMicrotask(() => {
          try {
            const x = onReject(this.reason)
            resolvePromise(newP, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === FUFILLED) {
        queueResolveTask()
      }
      if (this.status === REJECTED) {
        queueRejectTask()
      }
      if (this.status === PENDIGN) {
        this.resolveCallback.push(queueResolveTask)
        this.rejectCallback.push(queueRejectTask)
      }
    })
    return newP
  }

  catch (fn) {
    return this.then(null, fn)
  }

  finally (fn) {
    return this.then(fn, fn)
  }
}
Promise.resolve = (val) => {
  return new Promise((resolve) => {
    resolve(val)
  })
}
Promise.reject = (val) => {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}
Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject)
    })
  })
}

// Promise.all = (promises) => {
//   const result = []
//   let i = 0
//   let copyResolve = null
//   function processPromise (data, index) {
//     result[index] = data
//     i++
//     if (i === promises.length) {
//       copyResolve(result)
//     }
//   }
//   return new Promise((resolve, reject) => {
//     copyResolve = resolve
//     promises.forEach((promise, index) => {
//       promise.then((res) => {
//         processPromise(res, index)
//       }, reject)
//     })
//   })
// }

Promise.all = (promises) => {
  const result = []
  let i = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item).then((data) => {
        result[index] = data
        i++
        if (i === promises.length) {
          resolve(result)
        }
      }).catch(reject)
    })
  })
}

Promise.allSettled = (promises) => {
  const result = []
  let i = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item).then((data) => {
        result[index] = data
        i++
        if (i === promises.length) {
          resolve(result)
        }
      }, (err) => {
        result[index] = err
        i++
        if (i === promises.length) {
          resolve(result)
        }
      })
    })
  })
}

function resolvePromise (p, x, resolve, reject) {
  if (p === x) {
    return reject(new TypeError('chain cycle'))
  }
  let called
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, (r1) => {
          if (called) return
          called = true
          resolvePromise(p, r1, resolve, reject)
        }, (err) => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
// A +  
Promise.defer = Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise

```

