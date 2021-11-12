### 递归以及尾递归优化
* 递归实现累乘
```
function recurFun(n){
    console.trace()
    if(n == 0 )
    return ;
    return n * recurFun(n-1);
}
 recurFun(3);
 
```
#### 调用堆栈如图所示<br>

![调用堆栈如图](/src/assets/images/trace.png)

* 尾递归优化
```
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
调用堆栈如下图<br>

![调用堆栈](/src/assets/images/tail.png)
### 在node低版本下开启尾递归优化 node --harmony_tailcalls main.js
### 总结<br>
**node 7.2.0 版本移除掉了尾递归优化**



