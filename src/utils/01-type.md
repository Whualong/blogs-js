### js类型检查

- 实现方式
- 代码

#### 实现方式

Object.prototype.toString

正则表达式过滤

#### 代码

```js

/*
 *@description:  js中数据类型判断
 *@author: codeWen666
 *@date: 2021-10-23 14:47:01
 *@version: V1.0.5
*/
function checkType (what) {
  return Object.prototype.toString.call(what).replace(/\[object (.*?)\]/, '$1').toLowerCase()
}
// 测试
let b = 12n
let gen = function *test()
async function sync( ) {}
console.log(checkType())
console.log(checkType('1'))
console.log(checkType(1))
console.log(checkType(b))
console.log(checkType(Symbol('12')))
console.log(checkType(true))
console.log(checkType([]))
console.log(checkType(/\d/))
console.log(checkType(new Date()))
console.log(checkType(null))
console.log(checkType(val => val))
console.log(checkType(gen))
console.log(checkType(sync))          

// 输出结果
// undefined
// string
// number
// bigint
// symbol
// boolean
// array
// regexp
// date
// null
// function
// generatorfunction
// asyncfunction

```

