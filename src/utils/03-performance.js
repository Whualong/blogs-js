/*
 *@description: 通过 performance API 获取页面性能表现
 *@author: codeWen666
 *@date: 2021-10-23 16:45:05
 *@version: V1.0.5
*/
// 计算白屏时间
function whiteScreen () {
  const timing = window.performance.timing
  return timing.domLoading - timing.navigationStart
}
// 页面加载阶段时间
function performance () {
  // 监测是否支持performance API
  if (!window.performance) { return }
  const timing = window.performance.timing
  const timeDetail = {
    redirect: timing.redirectEnd - timing.redirectStart,

    whiteScreen: whiteScreen,

    dom: timing.domComplete - timing.domLoading,

    load: timing.loadEventEnd - timing.navigationStart,

    unload: timing.unloadEventEnd - timing.unloadEventStart,

    request: timing.responseEnd - timing.requestStart,

    time: new Date().getTime()
  }
  return timeDetail
}
// 各资源详情
const getResources = () => {
  if (!window.performance) return
  const data = window.performance.getEntriesByType('resource')
  const resource = {
    xmlhttprequest: [],
    css: [],
    other: [],
    script: [],
    img: [],
    link: [],
    fetch: [],

    time: new Date().getTime()
  }

  data.forEach(item => {
    const arry = resource[item.initiatorType]
    arry && arry.push({

      name: item.name,

      duration: item.duration.toFixed(2), // 耗时

      size: item.transferSize,

      protocol: item.nextHopProtocol
    })
  })

  return resource
}
