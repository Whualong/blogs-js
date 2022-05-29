### any类型与unknown类型

- 区别

#### 区别

any类型和unknown类型都是为了规定不确定的类型。例如用户输入和第三方库的接入。

但是unknown类型相比any类型更加安全。

在unknown 类型被确定是某个类型之前,它不能被进行任何操作比如实例化、getter、函数执行等等。

而any是可以的。所以说unknown是更加严格安全的any类型。

```ts

let p : any ;
p.hasOwnProperty('name') // ok
p.getMonth() // ok
let v : unknown;
v.hasOwnProperty('name') // error
v.getMonth() // error
function test( val : unknown ) : void {
	if( val instanceOf Date ){
 	 	val.getMonth() // ok   
  }
}

```

