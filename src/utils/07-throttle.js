/*
 *@description: 节流函数 持续触发 在某个时间内只执行一次
 *@author: codeWen666
 *@date: 2021-10-23 22:45:47
 *@version: V1.0.5
*/
function throttle (fn, delay) {
  let prev = +new Date()
  return function () {
    const now = +new Date()
    if (now - prev >= delay) {
      fn.apply(this, [...arguments])
      prev = now
    }
  }
}
