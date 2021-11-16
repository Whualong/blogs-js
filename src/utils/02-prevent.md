### 阻止页面刷新和关闭

- 原理
- 实现

#### 原理

beforeunload事件

#### 实现

```js

/*
 *@description: 阻止页面刷新和关闭
  调用下面方法后 当点击关闭或刷新按钮 操作当前网页时弹窗拦截 是否离开此页面
 *@author: codeWen666
 *@date: 2021-10-23 15:23:07
 *@version: V1.0.5
*/

function preventUnload () {
  window.addEventListener('beforeunload', (e) => {
    e = e || window.event
    e.returnValue = '您还没有保存'
  })
}

```

