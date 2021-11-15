### 单例模式

- 何为单例模式？
- 写法

#### 何为单例模式？

单例模式通俗的说就是一个只能被初始化一次的类。多次调用只返回第一次创建的实例。

#### 写法

```js
var Singleton = function(name) {
    this.instance = null;
    // 实例的属性
    this.name=name;
}
Singleton.prototype.getName = function(){
    console.log(this.name)
}
Singleton.getInstance = function(name){
    !this.instance && (this.instance = new Singleton(name))
  return this.instance;
}


```

