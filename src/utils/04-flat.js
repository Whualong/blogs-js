/*
 *@description: 数组扁平化的实现方法
 *@author: codeWen666
 *@date: 2021-10-23 21:48:14
 *@version: V1.0.5
*/
// 方法一 使用原生的flat
function myflat (arr) {
  return arr.flat(Infinity)
}
// 方法二 使用reduce
function myflat2 (arr) {
  return arr.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? myflat2(b) : b)
  }, [])
}
// 方法三 使用正则
function myflat3 (arr) {
  return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
}

// 方法四 使用递归
const result = []
function myflat4 (arr) {
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.concat(myflat4(item))
    } else {
      result.push(item)
    }
  })
  return result
}

module.exports = {
  myflat
}
