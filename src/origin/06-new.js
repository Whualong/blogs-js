/*
 *@description: js 中 new 的原理

    参考 阮一峰 网道 教程
    使用new命令时，它后面的函数依次执行下面的步骤。

 1、创建一个空对象，作为将要返回的对象实例。
 2、将这个空对象的原型，指向构造函数的prototype属性。
 3、将这个空对象赋值给函数内部的this关键字。
 4、开始执行构造函数内部的代码。

    也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。
    如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

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
