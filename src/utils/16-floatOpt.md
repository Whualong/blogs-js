### js中浮点运算的实现

- js 中 0.1+0.2 不等于 0.3 ？

- 浮点运算解决方案

#### js中0.1+0.2不等于0.3？

根据国际标准 IEEE 754，JavaScript 浮点数有64个二进制位。

其中1位为符号位，11位表示整数，52位表示小数部分。

0.5 表示2进制为0.1

0.25表示2进制为0.01

0.75 表示2进制为 0.11

可以发现随着使用二进制位数的增加精度会越来越高但是譬如五分之一 十分之一是永远无法表示的

0.2用2进制表示为多少呢？

```js
0.2.toString(2) 
0.001100110011001100110011001100110011001100110011001101
小数点后面有54位
```

所以js中有限的52位是无法表示0.2这种数字的唯一的方法就是截取。

#### 浮点运算解决方案

大概思路就是小数部分做运算时，两个运算数小数部分的最长长度 乘 10 。

```js
 // 以下代码未做优化、安全边界情况、参数校验等

 function floatOperation(a,b){
            a = a + ''
            b = b + ''
            let tmp1 = a.split('.')
            let tmp2 = b.split('.')
            let intLen = Math.max(tmp1[0].length,tmp2[0].length)
            let floatLen = Math.max(tmp1[1].length,tmp2[1].length)
            if(tmp1[0].length < tmp2[0].length){
                tmp1[0] = tmp1[0].padStart(intLen,'0')
            }else
            if(tmp1[0].length > tmp2[0].length){
                tmp2[0] = tmp2[0].padStart(intLen,'0')
            }
            if(tmp1[1].length < tmp2[1].length){
                tmp1[1] = tmp1[1].padEnd(floatLen,'0')
            }else
            if(tmp1[1].length > tmp2[1].length){
                tmp2[1] = tmp2[1].padEnd(floatLen,'0')
            }
            let intCarry = 0
            let intRes = []
            let floatCarry = 0
            let floatRes = []
            for(let i = tmp1[0].length -1 ; i>=0;i--){
                let val =  Number(tmp1[0][i]) + Number(tmp2[0][i]) + intCarry;
                intCarry = parseInt(val / 10)
                val = val % 10
                intRes.push(val)
            }
            for(let i =tmp1[1].length-1; i>=0;i--){
                let val =  Number(tmp1[1][i]) + Number(tmp2[1][i]) + floatCarry;
                floatCarry = parseInt(val / 10) 
                val = val % 10
                floatRes.push(val)
            }
            intRes =  Number(intRes.reverse().join('') )+ floatCarry 
            return `${intRes}.${floatRes.reverse().join('')}`
        }

 
```
