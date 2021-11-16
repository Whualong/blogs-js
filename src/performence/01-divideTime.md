### 时间分片优化渲染   

- 原理
- 实现

#### 原理

当执行一个耗时间很长的同步任务时会阻塞渲染，（js引擎和渲染引擎互斥）使用 yield 执行一段时间后交出执行权，渲染引擎渲染页面。在下轮事件循环中唤醒。

相当于把本轮事件循环中一个耗时的任务拆解到多轮事件循环中执行。

#### 实现

```html

<!DOCTYPE html>
<html>
  <head>
    <style>
      @keyframes left {
        0%{
          left:0%;
        }
        to{
          left:80%;
        }
      }
      .dom{
        width: 50px;
        height:50px;
        position: relative;
        background-color: red;
        border-radius: 50%;
        animation: left 2s 1s infinite;
      }
    </style>
  </head>
  <body>
    <div class="dom"></div>
    <script>
      // 模仿耗时计算任务
      // function task(){
      //     let start=performance.now()
      //     let i=0;
      //     while(performance.now()-start<=3000){
      //       i++;
      //     }
      //     return i;
      // }
      // setTimeout(task,1500)
        
      // 时间分片后
      function * task1(){
        let i=0;
        let start=performance.now()
        while(performance.now()-start<=3000){
          i++;
          yield i;
        }
        return i;
      }
      // 时间分片
      function  sliceTime(fn){
          let step=fn();
          return async function(){
            let data;
            do{
                data=step.next()
                console.log(data.value)
                await new Promise((resolve)=>setTimeout(resolve))
            }while(!data.done)
          }
      }
      setTimeout(()=>{
       let test= sliceTime(task1);
       test()
      },1500)
         
    </script>
  </body>
</html>

```

