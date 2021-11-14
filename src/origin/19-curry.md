### 柯里化函数

- 何为柯里化函数？
- 实现一个简单的柯里化函数
- 高级柯里化函数
- 应用场景

#### 何为柯里化函数？

简单一点就是柯里化函数的功能就是把

```
fn(a,b,c,d...) 改造为 fn(a)(b)(c)(d)(...) 这样的调用
```

#### 实现一个简单的柯里化函数

```javascript
// 普通调用
function add(a, b) {
  return a + b;
}
// 柯里化
function curry(callback) {
  return function(a) {
    return function(b) {
      return callback(a, b);
    };
  };
}

curry(add)(1)(2) // 3

```

#### 高级柯里化函数的实现

```js
function carry(callback){
    return function carried(...args){
     	if(args.length >= callback.length ){
            return callback.apply(this,args)
        }else{
            return function(...args2){
                return carried.apply(this,args.concat(args2))
            }
        }   
    }
}
```

了解柯里化的高级实现，可以参考lodash库中`curry`可以实现更复杂的功能。

#### 应用场景

```js
// 假设我们有这样一个函数 record(date,早上,中午,晚上) 记录一天的饮食
let rCarry= carry(record); // 使用柯里化
let rNow = rCarry('2021-11-15') // 获取当天所有饮食记录
let rMorn = rNow('morning') // 获取早上的饮食记录
let rNoon = rMorn('noon') // 获取中午的饮食记录
let rNight = rNoon('night') // 获取晚上的饮食记录
```

