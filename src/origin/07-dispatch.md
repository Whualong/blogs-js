### dispatch

- 含义
- 实现思路
- 实现例子

#### 含义

调度promise的并发数量。

#### 实现思路

- 用一个数组存放执行的任务。
- 设置一个计数器。当添加运行任务时加1，运行完成时减1。
- 只要计数器小与并发限制数就添加运行任务，直到任务队列清空。

#### 实现例子

```js

/*
 *@description: 限制promise的并行数量
 *@author: codeWen666
 *@date: 2021-10-22 00:32:56
 *@version: V1.0.5
*/

class Dispatch {
  constructor (maxNum) {
    this.maxTime = maxNum || 2
    this.runTime = 0
    this.asyncQueue = []
  }

  add (promiseGenerator) {
    this.asyncQueue.push(promiseGenerator)
    this.runPromise()
  }

  runPromise () {
    if (this.asyncQueue.length && this.runTime < this.maxTime) {
      const promiseRun = this.asyncQueue.shift()
      this.runTime++
      promiseRun().then(() => {
        this.runTime--
        this.runPromise()
      })
    }
  }
}

function timeout (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
const dispatch = new Dispatch()

function addTask (time, order) {
  dispatch.add(() => {
    return timeout(time).then(() => {
      console.log(order)
    })
  })
}

addTask(1000, '1')
addTask(500, '2')
addTask(400, '3')
addTask(200, '4')

// 输出结果 2 3 1 4

```

