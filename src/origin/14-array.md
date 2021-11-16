 ### js中各个迭代方法的实现

- forEach的实现
- map的实现
- filter的实现
- reduce的实现

#### forEach 的实现

```js

Array.prototype.myForEach = function (cb,thisArg){
  if( typeof cb != 'function' ){
    throw new Error('undefined is not a function');
  }
  if( this == null ){
    throw new Error('this is null or undefined');
  }
  let arr = this ;
  for (let i = 0;i < arr.length; i++) {
    cb.call(thisArg,arr[i],i,arr);
  }
}

```
#### map 的实现 

```js

Array.prototype.myMap = function (cb,thisArg){
  if( typeof cb != 'function' ){
    throw new Error('undefined is not a function');
  }
  if( this == null ){
    throw new Error('this is null or undefined');
  }
  let arr = this ;
  let result = [];
  for (let i = 0;i < arr.length; i++) {
    result.push( cb.call(thisArg,arr[i],i,arr) );
  }
  return result;
}

```
#### filter 的实现

```js

Array.prototype.myFilter = function (cb,thisArg){
  if( typeof cb != 'function' ){
    throw new Error('undefined is not a function');
  }
  if( this == null ){
    throw new Error('this is null or undefined');
  }
  let arr = this ;
  let result = [];
  for (let i = 0;i < arr.length; i++) {
    if(cb.call( thisArg, arr[i], i, arr ))
    result.push(arr[i]) );
  }
  return result;
}

```
#### reduce 的实现

```js

Array.prototype.myReduce = function (cb,initVal){
  if( typeof cb != 'function' ){
    throw new Error('undefined is not a function');
  }
  if( this == null ){
    throw new Error('this is null or undefined');
  }
  let arr = this ;
  let innerInit = initVal;
  let k = 0;
  if( innerInit == undefined){
      while(k <arr.length && !(k in arr) ){
        k++;
      }
      if( k >= arr.length ){
        throw new Error('empty arr');
      }
      innerInit = arr[k++];
  }
  for (; k < arr.length; k++ ) {
    innerInit = cb( innerInit, arr[k], k, arr )
  }
  return innerInit;
}

```