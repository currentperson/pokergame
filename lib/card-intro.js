
import translate from './translate'
import prefix from './prefix'

export default function (card, $el) {
  var transform = prefix('transform')
  var transition = prefix('transition')
  var transitionDelay = prefix('transitionDelay')

  card.intro = function (i, cb) {
    var delay = i * 10 + 250
	console.log("[Card-intro.js] : delay is " + delay);
    var z = i / 4
    console.log("[Card-intro.js] : z is " + z);
    $el.style[transform] = translate(-z + 'px', '-250%')
	/*0表示完全透明*/
    $el.style.opacity = 0
    $el.style.zIndex = i
    /*500毫秒后执行函数*/
    setTimeout(function () {
      $el.style[transition] = 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      $el.style[transitionDelay] = delay / 1000 + 's'
      $el.style[transform] = translate(-z + 'px', -z + 'px')
      $el.style.opacity = 1

      setTimeout(function () {
        $el.style[transition] = ''

        cb && cb(i)
        console.log("[Card-intro.js]: cb(i) is " + cb(i));
      }, 1250 + delay)
    }, 500)
  }
}
