### requestAnimationFrame

- 匀速滚动不掉帧
- 实现

#### 实现

```html

<!DOCTYPE html>
<html>
  <head>
    <style>
      .dom{
        height:  8800px;
        display: flex;
        flex-direction: column;
      }
      .head,.bottom{
        flex: 0 0 100px;
        text-align: center;
        line-height: 100px;
      }
      .mid{
        flex:1;
        background: pink;
      }

    
    </style>
    <script>
      function test(){
        let dom = document.querySelector('.dom');
        let h = dom.clientHeight;
        let sh = document.documentElement.scrollTop;
        if(sh < h - 700){
          document.documentElement.scrollTop = sh + 50;
          console.log('donghua1')
          window.requestAnimationFrame(test);
        }
        

      }
      function toBottom(){
        window.requestAnimationFrame(test);
      }
      function test1(){
        let sh = document.documentElement.scrollTop;
        if(sh > 0){
          document.documentElement.scrollTop = sh - 50;
          window.requestAnimationFrame(test1);
        }
        

      }
      function toTop(){
        window.requestAnimationFrame(test1);
      }
    </script>
  </head>
  <body>
    <div class="dom">
      <div class='head'>
        <button onclick="toBottom()">滚动到底部</button>
      </div>
      <div class='mid'></div>
      <div class='bottom'>
        <button onclick="toTop()">回到首页</button>
      </div>
    </div>
    
  </body>
</html>

```

