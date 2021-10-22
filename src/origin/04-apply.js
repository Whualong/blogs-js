/*
 *@description:实现apply
 *@author: codeWen666
 *@date: 2021-10-23 00:34:30
 *@version: V1.0.5
*/

// eslint-disable-next-line no-extend-native
Function.prototype.myapply = function () {
  const fn = this
  const args = Array.from(arguments)
  let ctx = args.shift()
  ctx = ctx || globalThis
  ctx.fn = fn
  ctx.fn(args)
  delete ctx.fn
}
