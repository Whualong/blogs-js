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
