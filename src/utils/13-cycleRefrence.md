### 如何判断对象是否存在循环引用？

- 循环应用的情况分析
- 实现判断循环应用

#### 循环引用的情况分析

一、对象引用自身

```js

// 这种写法在低版本浏览器会报错
let obj = {
    name : 'js',
    age : 10,
}
obj.child = obj 

let obj1 = {
	name : 'js',
    child : {}
}
obj1.child.obj = obj.child

```

二、不同对象之间相互引用

```js

let obj1 = {
	name : 'js',
	age : 12,
}

let obj2 = {
    name : 'css',
    age : 12,
}
obj1.child = obj2
obj2.child = obj1

```

#### 实现判断循环引用

```js
 
function isCycle ( obj ){
    let evenSet = new Set()
    let res = false;
    function _check( obj ){
        if( typeof obj !== 'object' ){
      	 	return
    	}
        if( evenSet.has( obj ) ){
            return res = true;
        }
        evenSet.add( obj )
        for ( let key in obj ){
          if( obj.hasOwnProperty( key ) ){
              _check( obj[key] )
          }
        }
        evenSet.delete( obj ) 
    }
    _check( obj )
    return res;
}


```

