### call的实现

- 含义
- 实现

#### 含义

修改函数中this的指向。参数 1 上下文对象 ，剩余参数为调用传参

#### 实现

```js

/*
 *@description: 实现 call
 *@author: codeWen666
 *@date: 2021-10-23 00:14:32
 *@version: V1.0.5
*/

Function.prototype.mycall = function () {
  const fn = this
  const args = Array.from(arguments)
  let ctx = args.shift()
  ctx = ctx || globalThis
  ctx.fn = fn
  ctx.fn(...args)
  delete ctx.fn
}

```



