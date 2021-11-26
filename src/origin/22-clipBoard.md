### 剪贴板相关API

- document.execCommand()
- 异步的clipboard API
- copy paste事件

#### document.execCommand

- document.execCommand('copy')（复制）
- document.execCommand('cut')（剪切）
- document.execCommand('paste')（粘贴）

使用方法：

当用户选择完文本，此时调用 document.execCommand('copy');  选择的文本就会进入剪贴板。

当用户聚焦一个文本框时，此时调用 document.execCommand('paste'); 剪贴板的内容就会被粘贴到文本框中。

问题：

只能将选中的内容复制到剪贴板，无法向剪贴板任意写入内容。其次，它是同步操作，如果复制/粘贴大量数据，页面会出

现卡顿。有些浏览器还会跳出提示框，要求用户许可，这时在用户做出选择前，页面会失去响应。

#### 异步的clipboard API

navigator.clipboard

所有操作都是异步的，返回 Promise 对象，不会造成页面卡顿。而且，它可以将任意内容（比如图片）放入剪贴板。

Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。不过，开发环境（`localhost`）允许使用次API。需要

注意的是，当使用此API读取剪贴板内容时浏览器会弹窗提示用户是否允许授权。而写操作则不需要。

可以把下面代码粘贴到控制台下并且点击当前页使焦点聚焦到当前页测试：

```js

setTimeout(async () => {
  const text = await navigator.clipboard.readText();
  console.log("复制的内容",text);
}, 5000);

```

相关的API

- clipboard.readText()
- clipboard.writeText()
- clipboard.read()
- clipboard.write()

clipboard.readText() 方法用于读取剪贴板里面的文本数据。

clipboard.writeText()方法用于将文本内容写入剪贴板。

代码如下：

```js

// 注意 触发前一定要聚焦到document
setTimeout(async () => {
  await navigator.clipboard.writeText("可以哈哈");
}, 5000);
ctrl + v　//  

```

#### past事件

用户使用剪贴板数据，进行粘贴操作时，会触发 paste 事件。下面的示例是拦截粘贴操作，由脚本将剪贴板里面的数据取出来。

```js

document.addEventListener('paste', async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText();
  console.log(' : ', text);
});

```

