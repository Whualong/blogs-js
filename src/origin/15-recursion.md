### 递归以及尾递归优化

- 普通递归实现累乘
- 尾递归优化
- 总结

#### 递归实现累乘

```js

function recurFun(n){
    console.trace()
    if(n == 0 )
    return ;
    return n * recurFun(n-1);
}
 recurFun(3);
 
```
调用堆栈如图所示

![调用堆栈如图](/src/assets/images/trace.png)

#### 尾递归优化

```js

'use strict';
function tailRecur(n,total =1 ){
    console.trace()
    if(n == 0){
        return total;
    }
    return tailRecur(n-1,n*total);
}
tailRecur(3);

```
调用堆栈如下图

![调用堆栈](/src/assets/images/tail.png)

#### 总结

在node低版本下开启尾递归优化 node --harmony_tailcalls main.js

<u>**node 7.2.0 版本移除掉了尾递归优化**</u>



