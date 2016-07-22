/*将数组的顺序打乱*/
export default function (array) {
  console.log("[Fisher-yates.js]: array is " + array);
  var rnd, temp

  for (var i = array.length - 1; i; i--) {
    rnd = Math.random() * i | 0
    temp = array[i]
    array[i] = array[rnd]
    array[rnd] = temp
  }

  return array
}
