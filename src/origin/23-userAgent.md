### userAgent使用介绍

- 判断用户设备
- 如何伪装？

#### 判断用户设备

```js

// Android 端
function isAndroid() {
    const n = navigator.userAgent.toLowerCase();
    return n.indexOf( 'android' ) > -1 && !/ipad/gi.test( n );
}
//　IOS 端
function isAndroid() {
    const n = navigator.userAgent.toLowerCase();
    return n.indexOf( 'phone' ) > -1 && !/ipad/gi.test( n );
}
// 微信小程序端
function isAndroid() {
    const n = navigator.userAgent.toLowerCase();
    return n.indexOf( 'wechat' ) > -1 && !/ipad/gi.test( n );
}

```

#### 如何伪装？

```js

// 以下代码修改后不生效
navigator.userAgent = 'apple Mozilia'
// 正确修改方式
Object.defineProperty(navigator,'userAgent',{
    get:function(){
        return 'Android';
    }
})

```

#### 总结

因为用户可以更改浏览器的用户代理字符串，所以用这个字段判断设备是存在问题的。可以结合获取屏幕尺寸的方法，做更加合理的判断。