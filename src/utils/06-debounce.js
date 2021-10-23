/*
 *@description: 防抖函数  解决持续触发问题
 *@author: codeWen666
 *@date: 2021-10-23 22:39:03
 *@version: V1.0.5
*/

function debounce (fn, delay) {
  const time = null
  return function () {
    if (time) {
      clearTimeout(time)
      time = null
    }
    time = setTimeout(() => {
      fn.apply(this, [...arguments])
    }, delay)
  }
}
