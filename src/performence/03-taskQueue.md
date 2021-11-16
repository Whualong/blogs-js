### 宏任务和微任务和渲染时机

- 介绍
- 现象

#### 现象

```html

<!DOCTYPE html>
<html>
  <head>

  </head>
  <body>
    <script>
      let i = 0;
        function render1(){
          console.log(`%c render111->${++i}`,'color:green')
          if(i<50){
            window.requestAnimationFrame(render1)
          }
        }
        window.requestAnimationFrame(render1)
        console.log('宏1')
        setTimeout(()=>{
            console.log('宏任务1-1')
            Promise.resolve().then(()=>{
              console.log('微任务1-2')
              //操作dom
              document.getElementsByTagName('body')[0].style.background='green'
              
            })
        },0)
        setTimeout(()=>{
          console.log('宏任务1-2')
        },0)
        Promise.resolve().then(()=>{
          for(let i =0;i<990990000;i++){}
          console.log('微任务1-1')
        })
        console.log('同步1')
    </script>
    <script>
      let j = 0;
      function render2(){
          console.log(`%c render222->${++j}`,'color:orange')
          if(j<50){
            window.requestAnimationFrame(render2)
          }
        }
        window.requestAnimationFrame(render2)
        console.log('宏2')
        setTimeout(()=>{
            console.log('宏任务2-1')
            Promise.resolve().then(()=>{
              console.log('微任务2-2')
              //操作dom
              document.getElementsByTagName('body')[0].style.background='orange'
            })
        },5)
        setTimeout(()=>{
          console.log('宏任务2-2')
        },16)
        Promise.resolve().then(()=>{
          console.log('微任务2-1')
          
        })
        console.log('同步2')
    </script>
  </body>
</html>


```

