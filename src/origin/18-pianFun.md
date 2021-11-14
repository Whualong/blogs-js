### 偏函数

- 何为偏函数？
- 偏函数的示例
- 偏函数的通用写法
- 应用场景

#### 何为偏函数？

所谓偏函数，就是固定一个函数的一个或者多个参数，返回一个新的函数，这个函数用于接受剩余的参数。

#### 偏函数的示例

```javascript
// 常规写法
function add(a,b){
    return a+b;
}
add(1,2) // 3 
add(1,3) // 4
add(1,4) // 5
// 偏函数写法
function pFun(fn,a){
    return function (b){
        fn(a,b)
    }
}
let pAdd = pFun(add,1)
pAdd(2) // 3
pAdd(3) // 4
pAdd(4) // 5
// 可以看出，当我们需要固定传入的参数很多的情况下，使用偏函数处理非常方便。下面是通用的偏函数。
```

#### 偏函数的通用写法

```javascript
// 通用写法1
function pFun(...args){
    if(args.length<2){
        return new Error('arguments length must >= 2')
    }
    if(typeof args[0] !== 'function'){
         return new Error('arguments[0] must a callback function')
    }
    let callback = args[0];
    let params = args.slice(1);
    return function(...arg2){
       return callback.apply(this,params.concat(arg2))
    }
}
// 通用写法2
function pFun(...args){
     if(args.length<2){
        return new Error('arguments length must >= 2')
    }
    if(typeof args[0] !== 'function'){
         return new Error('arguments[0] must a callback function')
    }
    let callback = args[0];
    let params = args.slice(1);
    return callback.bind(null,...params);
}
```

#### 应用场景

在高级函数式编程中常用来固定多个相同的传参调用。

