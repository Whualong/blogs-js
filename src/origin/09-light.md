#### promise实现一个红绿灯

- 分析
- 实现

#### 分析

promsie的链式执行可以实现顺序控制。

使用递归可以跑起来。

#### 实现

```html

<!DOCTYPE html>
<html>
  <head>
    <style>
      .light1,.light2{
        width:40px;
        height: 40px;
        border-radius: 50%;
        background-color: red;
        margin:auto;
      }
    </style>
  </head>
  <body>
      <div class='light1'></div>
      <div class='light2'></div>
      <script>
        /*
         *@description: 使用promise实现一个交通灯
         *@author: codeWen666
         *@date: 2021-11-02 00:46:33
         *@version: V1.0.5
        */
          
        let dom=document.querySelector('.light1');
        // promise包装
        function createLight(color,delay){
          return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(color)
            },delay)
          })
        }
        // 实现
        function transLight(){
          return createLight('green',3000).then((data)=>{
             dom.style.background=data;
             return createLight('yellow',3000);
          }).then((data)=>{
            dom.style.background=data;
            return createLight('red',3000)
          }).then((data)=>{
            dom.style.background=data;
            transLight();
          })
        }
          
        transLight();

        // async　版本的实现
       
       let dom2=document.querySelector('.light2')
       
       function lightNext(color,delay){
       	  return new Promise((resolve)=>{
               setTimeout(()=>{
                 dom2.style.background=color;
                  resolve();
                },delay)
          })
       }
       async function lightTest(){
          await lightNext('green',3000);
          await lightNext('yellow',3000);
          await lightNext('red',3000);
          lightTest();
       }
       lightTest()
          
      </script>
  </body>
</html>

```

 

