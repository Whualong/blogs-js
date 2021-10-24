/*
 *@description: 检测浏览器帧率
 *@modifyContent:
 *@author: codeWen666
 *@date: 2021-10-25 02:11:04
*/
function getFps () {
  const prev = +new Date()
  let frame = 0
  return function () {
    if (+new Date() - prev <= 1000) {
      frame++
      requestAnimationFrame(arguments.callee)
    } else {
      alert(`fps == ${frame}`)
    }
  }
}
