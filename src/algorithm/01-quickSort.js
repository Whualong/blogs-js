/*
 *@description: 快速排序算法
 *@author: codeWen666
 *@date: 2021-10-23 13:01:49
 *@version: V1.0.5
*/
function quickSort (arr) {
  if (arr.length <= 1) { return arr }

  const pivotIndex = Math.floor(arr.length / 2)

  const pivot = arr.splice(pivotIndex, 1)

  const left = []

  const right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right))
}

const arr = [12, 34, 3, 6, 1, 45, 990, 120, 34]
console.log(quickSort(arr))
