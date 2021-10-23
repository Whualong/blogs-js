/*
 *@description: 实现一个instanceOf
 *@author: codeWen666
 *@date: 2021-10-23 23:06:27
 *@version: V1.0.5
*/
function _instanceOf (left, right) {
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) { return true }
    proto = Object.getPrototypeOf(left)
  }
}
