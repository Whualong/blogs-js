## js中隐式转换
### 如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为false，其他值都视为true。
*   undefined
*   null
*   false
*   0
*   NaN
*   "" 或''（空字符串）
---
__注意（空对象和空数组转换为true）__<br>

```
    if([]){ 

        console.log(true)
    }
    // true

    if({}){

        console.log(true)
    }
    //true

```


