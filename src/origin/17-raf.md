### requestAnimationFrame

#### window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

+ #### 参数：callback function 该回调函数会被传入DOMHighResTimeStamp参数，该参数与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻。
+ #### 返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
+ #### 应用场景：动画效果

+ #### 注意：当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的"\<iframe\>" 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

+ #### 示例

```
function test(){
  let dom = document.querySelector('.dom');
  let h = dom.clientHeight;
  let sh = document.documentElement.scrollTop;
  if(sh < h - 700){
    document.documentElement.scrollTop = sh + 50;
    window.requestAnimationFrame(test);
  }
}

function toBottom(){
  window.requestAnimationFrame(test);
}

上述代码的作用是网页匀速滚动到底部
```
+ #### 优点：相较于以前使用setTimeout，不会造成掉帧，因为在最小化隐藏页面和隐藏的iframe中会暂停执行，再次打开会继续执行的特点，所以性能好。</p>
+ #### 兼容性写法
```
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

因为不是所有设备的绘制时间间隔是1000/60 ms, 以及上面并没有cancel相关方法，所以，就有下面这份更全面的兼容方法：

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

代码来自张鑫旭-鑫空间-鑫生活[https://www.zhangxinxu.com]
```