### 高级jsonp的实现

- 全局函数处理
- promise包装

```js

( function( global ){
  let id = 0;
  let container = document.head;
  function jsonp( options ){
    let { url, data, callback } = { ...options }
    let callbackFun = 'jsonp' + id++ ;
    data['callback'] = callbackFun
    return new Promise(( resolve, reject ) => {
      	try{
           let scriptNode = document.createElement('script');
           let params = [];
           for ( let key in data ){
             params.push( `${key}=${data[key]}` )
           }
           url = url.indexOf('?') >= 0 ? url : url +'?'; 
           params = params.join('&');
           url += params;
           scriptNode.src = url;
           global[callbackFun] = function( ajaxData ){
             	callback( ajaxData )
              resolve( ajaxData );
             	delete global['callbackFun']
             	container.removeChild( scriptNode )
             	scriptNode = null
           }
           scriptNode.onerror = function( err ){
               reject( err )
               container.removeChild( scriptNode )
               scriptNode = null
					 }
           container.append( scriptNode );
        }catch( err ){
          reject(err)
        }
    })
  }
  global['jsonp'] = jsonp;
})( this )

jsonp({
  url:'zuoshouyisheng.com',
  data : {
    name : 'lisi',
    age : 12
  },
  callback : function(){
    console.log('callack')
  }
})


```

