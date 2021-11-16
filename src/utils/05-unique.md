### 数组去重

- 实现

#### 实现

```js

/*
 *@description: 数组去重
 *@author: codeWen666
 *@date: 2021-10-23 22:19:02
 *@version: V1.0.5
*/
const arr = [1, 2, 4, 5, 1, 2]
// 方法一 Set去重
function unique (arr) {
  return [...new Set(arr)]
}
// 方法二 indexOf 过滤
function unique2 (arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
// 方法三
function unique3 (arr) {
  const result = []
  arr.forEach((item) => {
    !result.includes(item) && result.push(item)
  })
  return result
}

module.exports = {
  unique
}

```



