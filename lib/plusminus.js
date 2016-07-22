/*返回value的正和负的值*/
export default function (value) {
  var plusminus = Math.round(Math.random()) ? -1 : 1

  return plusminus * value
}
