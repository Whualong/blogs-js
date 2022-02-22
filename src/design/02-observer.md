### 观察者模式

- 使用场景
- 优缺点
- 实现

#### 使用场景

vue源码中数据双向绑定的实现

#### 优缺点

优点：维护了一对多的关系

缺点：代码耦合度高

#### 实现

```js

class Subject{
	  constructor(){
      this.subList = []
    }
  	addSub( sub ){
      this.subList.push( sub )
      return this;
    }
  	removeSub( sub ){
      this.subList = this.subList.filter( ( item ) => {
      return item != sub
      })
      return this;
    }
  	notify(){
      let args = Array.from( arguments )
      this.subList.forEach( ( sub ) => {
        sub.update( ...args )
      })
      return this;
    }
}

class Observer{
  	constructor( name, age ){
      this.name = name
      this.age = age
    }
  	update( ...args ){
      this.getTask( ...args )
    }
  	getTask( mes ){
     	console.log( this.name, "得到了通知", mes )
    }
}
let sub = new Subject()
let p1 = new Observer( '小明', 12 )
let p2 = new Observer( '小张', 15 )
sub.addSub( p1 ).addSub( p2 ).notify( '北京举办冬奥会' )


```

