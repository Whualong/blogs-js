### js中隐式转换
* 情况一
* 情况二
* 情况三
* 情况四
* 情况五

#### 情况一

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为false，其他值都视为true。

*   undefined
*   null
*   false
*   0
*   NaN
*   "" 或''（空字符串）
---
**注意（空对象和空数组转换为true）**

```js
    
if( [ ] ){ 
    console.log(true)
 }
 // true

 if( { } ){
    console.log(true)
 }
 //true

```
#### 情况二

```js
  
  数字与字符串相加 结果为字符串

  1 + '2' // '12'

  1 + 2 + '3' // '33'

  相当于

  ( 1 + 2 ) + '3'

```

#### 情况三

```js

// 数字或字符串 与对象相加
let obj = {
  valueOf : function (){
    return 123;
  },
  toString : function (){
    return 'str';
  }
}
21 + obj // 144 
'ser' + obj // ser123

let obj = {
  toString : function (){
    return 'str';
  }
}
21 + obj // 21str
'haha' + obj // hahastr

以上结果可以明确：如果对象存在valueOf方法 优先使用valueOf，否则使用toString
（非原型上的valueOf toString）

```
#### 情况四

```js

let obj = {
  name : 'test'
}
console.log(obj) // 自己本身 调用的是valueOf
alert(obj) // [object object] 调用的是toString
toString 偏向于显示
valueOf 偏向于计算

```
#### 情况五

```js

[] + {} // '[object object]'
{} + [] // 0 
在谷歌浏览器下 {} + [] 相当于 + [] // 0
在ie浏览器下（不支持块级作用域）{} + [] // '[object object]'

```

