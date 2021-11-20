### 居中方案

- 水平居中
- 定宽高水平垂直居中
- 不定宽高水平垂直居中

#### 水平居中

```css

// 方案一
div{
    width:200px;
	margin:0 auto;
}
// 方案二
.container{
    text-align:center;
    font-size:0;
}
div{
	display:inline-block;
    width:200px;
    height:200px;
}

```

#### 定宽高水平垂直居中

```css

// 方案一
div{
    width:200px;
 	height: 200px;
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
}
// 方案二
div{
    width:200px;
 	height: 200px;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-100px;
    margin-top:-100px;
}

```

#### 不定宽高水平垂直居中

```css

// 方案一
div{
    width:200px;
 	height: 200px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%);
}
// 方案二
.container{
	display:flex;
	justify-content:center;
	align-items:center;
}
div{
	width: 100px;
  	height: 100px;	
}
// 方案三
.container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    font-size: 0;
}

.container::after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
div {
    display: inline-block;
    width: 400px;
    height: 400px;
    vertical-align: middle;
}

```

