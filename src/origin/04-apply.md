### apply

- 含义
- 实现

#### 含义

修改函数的this指向。参数1 绑定的上下文环境。参数2 为调用传参的数组形式。

#### 实现

```js

/*
 *@description:实现apply
 *@author: codeWen666
 *@date: 2021-10-23 00:34:30
 *@version: V1.0.5
*/

Function.prototype.myapply = function () {
  const fn = this
  const args = Array.from(arguments)
  let ctx = args.shift()
  ctx = ctx || globalThis
  ctx.fn = fn
  ctx.fn(args)
  delete ctx.fn
}

```

