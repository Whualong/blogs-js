### sequence

- 含义
- 实现

#### 含义

一个串行执行的 promsise 链条。

#### 代码

```js

// 实现方式一
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

// 实现方式二
function sequence (promises) {
  const result = []
  return promises.reduce((p1,p2) => {
    return p1.then(()=>{
        return p2().then((data)=>{
            result.push(data)
        })
	})
  },Promise.resolve()).then(() => result)
}

// 构造promise实例
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
sequence(arr).then((val)=>{
   console.log('last->', val)
})

// 输出结果 每秒依次输出
// order--> 1
// order--> 2
// order--> 3
// order--> 4
// last-> [ 1, 2, 3, 4 ]

```

