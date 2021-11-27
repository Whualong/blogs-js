### 快速生成一个 0 - 参数 数组（不使用循环和递归）

- Array.from( ) 实现
- keys( ) (返回一个迭代器对象 ，可使用　for of　遍历) 实现 
- 递归的实现

#### Array.from( ) 的实现

```js

function quickArray(n){
	return Array.from({length:n},(val,index)=>index)
}

```

#### keys( )的实现

```js

function quickArray(n){
	return [...new Array(n).keys()]
}

```

#### 递归的实现

```js

function quickArray(n,result = []){
    if( n === 0 )return []
    
     result.unshift(n-1);
     if (n === 1) {
       return result
     } else {
       return quickArray(n - 1,result)
     }
}

```

