### new的分析

- 原理介绍
- 实现

#### 原理介绍

使用new命令时，它后面的函数依次执行下面的步骤。

- 创建一个空对象，作为将要返回的对象实例。
- 将这个空对象的原型，指向构造函数的prototype属性。
- 将这个空对象赋值给函数内部的this关键字。
- 开始执行构造函数内部的代码。

如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

#### 实现

```js

/* 
 *@author: codeWen666
 *@date: 2021-10-23 00:53:06
 *@version: V1.0.5
*/

function _new () {
  const args = Array.from(arguments)
  const Creater = args.shift()
  const ctx = Object.create(Object.getPrototypeOf(Creater))
  const result = Creater.apply(ctx, args)
  if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
    return result
  }
  return ctx
}

```

