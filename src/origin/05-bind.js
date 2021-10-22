/*
 *@description: bind实现 （考虑构造函数调用bind的情况）
 *@author: codeWen666
 *@date: 2021-10-23 00:36:29
 *@version: V1.0.5
*/

// eslint-disable-next-line no-extend-native
Function.prototype.mybind = function () {
  const fn = this
  function Noop () {}
  const args = Array.from(arguments)
  const ctx = args.shift()
  const myBind = function () {
    const args2 = Array.from(arguments)
    fn.apply(ctx, args.concat(args2))
  }
  Noop.prototype = ctx.prototype
  myBind.prototype = new Noop()
  return myBind
}
