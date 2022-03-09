### 深拷贝的实现

- JSON.stringify的问题
- deepCopy的实现

#### JSON.stringify的问题

Date()类型 调用了toISOString

正则类型 转为了空对象

函数类型直接消失

循环引用直接报错

```js

 let obj = { d : new Date(), reg : /123/, fn : function(){ } }
 
 JSON.parse( JSON.stringify(obj) )

 {"d":"2022-03-09T14:20:32.266Z","reg":{} }


```

#### deepCopy的实现

```js

(
	function( _ ){
        var types = "Array Object Function RegExp Date String Number Boolean Undefined".split(' ');
        function type ( self ){
            return Object.prototype.toString.call( self ).slice( 8, -1 );
        }
        for( let i = types.length-1; i>=0; i-- ){
			_[ 'is' + types[i] ] = function( p ){
                return type( p ).toLowerCase() === types[ i ].toLowerCase()
            }
        }
        return _ 
	}
  
)( _ = {} )

function deepCopy( source ){
    let m = new Map() // 处理循环引用问题
    function clone( parent ){
        let child;
        if( parent === null ) return null
        if( typeof parent != 'object') return parent
        if( _.isDate( parent ) ){
            child = new Date( parent.getTime() )
        }else
        if( Array.isArray( parent ) ){
            child = []
        }else
        if( _.isRegExp( parent ) ){
            result = ''
            parent.ignoreCase && ( result+= 'i' )
            parent.multipline && ( result+= 'm' )
            parent.global && ( result+= 'g' )
            child = new RegExp( parent.source, result )
            if( parent.lastIndex ) child.lastIndex = parent.lastIndex
		}else{
            let proto = Object.getPrototypeOf( parent )
            child.prototype = Object.create( proto )
        }
        if( m.has( parent ) ){
            return m.get( parent )
        }
        m.set( parent, child )
        for( let k in parent ){
            child[ k ] = clone( parent[ k ] )
        }
        return child
    }
    return clone( source )
}

```

