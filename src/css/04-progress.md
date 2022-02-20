### 页面顶部实现滚动进度条

- js实现
- css实现

#### js实现原理

1. 获取文档的可滚动高度
2. 计算滚动高度占可滚动高度的比值 乘以视口宽度
3. 监听滚动实现实时计算

#### css实现原理

​	1、在body元素上设置一个从左下到右上的线性渐变背景。

```css

body{
    background-image:linear-gradient(to right top,red 50%,white 50%);
    background-repeat:no-repeat;
}

```

此时滚动发现滚动的元素被遮挡，我们可以设置一个伪元素去屏蔽

```css

body::after{
  content:'';
  position:fixed;
  height:100%;
  width:100%;
  left:0;
  top:5px;
  display:block;
  background:white;
  z-index: -1;
}

```

还存在一个问题就是滚动到页面底部的时候进度条并没有到最大宽度，我们可以通过调整background-size解决

```css

body{
    background-image:linear-gradient(to right top,red 50%,white 50%);
    background-repeat:no-repeat;
    background-size:100% calc( 100% - 100vh + 5px )
}

```

+5px是为了能够显示5px高的进度条

实现效果 https://codepen.io/codewen666/pen/RwjMKbd

