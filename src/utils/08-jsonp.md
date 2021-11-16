```js
/*
 *@description: prmise包装一个jsonp
 *@author: codeWen666
 *@date: 2021-10-23 23:33:45
 *@version: V1.0.5
*/
function jsonp (url, params, callbackName) {
  const formatUrl = () => {
    let dataStr = ''
    for (const key in params) {
      dataStr += `${key}=${params[key]}&`
    }
    dataStr += `callback=${callbackName}`
    return `${url}?${dataStr}`
  }
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = formatUrl()
    document.body.appendChild(script)
    window[callbackName] = (data) => {
      resolve(data)
      document.body.removeChild(script)
      script = null
    }
  })
}

module.exports = {
  jsonp
}

```