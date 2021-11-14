### 组合函数

- 什么是组合函数？
- 简单的实现思路
- 高级的实现方式
- 应用场景

#### 高级的实现方式

```javascript
let compose = (...funcArgs) => (...args) => {
  for (let i = funcArgs.length - 1; i >= 0; i--) {
    args = i === funcArgs.length - 1 ? funcArgs[i](...args) : funcArgs[i](args);
  }
  return args;
}

let pipe = (...funcArgs) => compose(...funcArgs.reverse());
```

