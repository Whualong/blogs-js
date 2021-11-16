### ArrayBuffer

- 介绍
- 如何使用？
- 注意事项
- DataView
- DataView参数
- 应用场景
- 字节序概念

#### 介绍（引于mdn）

**`ArrayBuffer`** 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为“byte array”。

不能直接操作 `ArrayBuffer` 的内容，而是要通过[类型数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)或 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

#### 如何使用？

```js

const buffer = new ArrayBuffer(8); // param 8个字节长度

console.log(buffer.byteLength); //　8


```

#### 注意事项

如果 length 大于 [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)（>= 2 ** 53）或为负数，则抛出一个 [`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError) 异常。

#### DataView

**`DataView`** 视图是一个可以从 二进制[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的[字节序](https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness)问题。

```
new DataView(buffer [, byteOffset [, byteLength]])
```

#### DataView参数

- `buffer`

  一个 已经存在的[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 或 [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 对象，`DataView` 对象的数据源。

- `byteOffset` 可选

  此 `DataView` 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。

- `byteLength` 可选

  此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配buffer的长度。

#### 应用场景

```js

const buffer = new ArrayBuffer(16);
const view1 = new DataView(buffer); // 0 ~ 15 占用整个buffer
const view2 = new DataView(buffer, 12, 4); // 12 13 14 15 占用四个字节长度
view1.setInt8(12, 42); // 在第12个字节设置值为42
console.log(view2.getInt8(0)); // 42

```

#### 字节序概念

需要多个字节来表示的数值，在存储时其字节在内存中的相对顺序依据平台架构的不同而不同。而使用 DataView 的访问函数时，不需要考虑平台架构中所使用的是哪种字节序。可以使用下列方法检测自己的系统使用的小端字节序还是大端字节序。

小端字节序：低位在前，高位在后 （机器处理方便）

大端字节序：高位在前，低位在后（人类阅读方便）

检测字节序：

```js

var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true /* 设置值时，使用小端字节序 */);
  // Int16Array 使用系统字节序（由此可以判断系统字节序是否为小端字节序）
  return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // 返回 true 或 false

```

一般情况下都为小端字节序

