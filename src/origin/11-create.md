### Object.create

- 介绍
- 实现

#### 介绍

以参数为原型，创建一个对象。

#### 实现

```js

/*
 *@description: Object.create()的实现原理
 *@author: codeWen666
 *@date: 2021-11-07 22:33:28
 *@version: V1.0.5
*/

Object.create = function (obj) {
  function F () {}
  F.prototype = obj
  return new F()
}

```

