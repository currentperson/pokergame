
import createElement from './create-element'
import translate from './translate'
import prefix from './prefix'
import intro from './card-intro'
import shuffle from './card-shuffle'
import sort from './card-sort'
import bysuit from './card-bysuit'
import fan from './card-fan'
import poker from './card-poker'

var maxZ = 52

export default function (i) {
  var transition = prefix('transition')
  var transform = prefix('transform')
  console.log("card.js start: i is " + i);
  var value = i % 13 + 1
  console.log("[card.js]: value is " + value);
  //牌的名称
  var name = value === 1 ? 'A' : value === 11 ? 'J' : value === 12 ? 'Q' : value === 13 ? 'K' : value
  console.log("[card.js]: name is " + name);
  var suit = i / 13 | 0
  console.log("[card.js]: suit is " + suit);
  var suitName = SuitName(suit)
  console.log("[card.js]: suitName is " + suitName);
  var z = (52 - i) / 4
  console.log("[card.js]: z is " + z);

  var $el = createElement('div')
  var $topleft = createElement('div')
  var $bottomright = createElement('div')
  var $face = createElement('div')

  var isMovable = false

  var self = {i, value, suit, pos: i, $el, mount, unmount}
  /*为元素添加class*/
  $el.classList.add('card', suitName, (suitName + value))
  $topleft.classList.add('topleft')
  $bottomright.classList.add('bottomright')
  $face.classList.add('face')
  /*处理大王的情况*/
  $topleft.textContent = suit < 4 ? name : 'J\nO\nK\nE\nR'
  $bottomright.textContent = suit < 4 ? name : 'J\nO\nK\nE\nR'

  /*定义了牌的层次*/
  $el.style.zIndex = 52 - i
  $el.style[transform] = 'translate(-' + z + 'px, -' + z + 'px)'

  $el.appendChild($face)
  $el.appendChild($topleft)
  $el.appendChild($bottomright)

  intro(self, $el)
  shuffle(self, $el)
  sort(self, $el)
  bysuit(self, $el)
  fan(self, $el)
  poker(self, $el)

  self.enableMoving = function () {
    if (isMovable) {
      // Already is movable, do nothing
      return
    }
	//move	鼠标会变成交叉箭头，指示某对象可被移动。
    $el.style.cursor = 'move'
    addListener($el, 'mousedown', onMousedown)
    addListener($el, 'touchstart', onMousedown)
  }

  self.disableMoving = function () {
    if (!isMovable) {
      // Already disabled moving, do nothing
      return
    }
    $el.style.cursor = ''
	/*鼠标下去和拖动开始会出发onMousedown函数*/
    removeListener($el, 'mousedown', onMousedown)
    removeListener($el, 'touchstart', onMousedown)
  }

  return self

  function onMousedown (e) {
	/*得到元素的位置*/
    var middlePoint = self.$root.getBoundingClientRect()
    var pos = {}
    /*禁止默认的行为*/
    e.preventDefault()

    if (e.type === 'mousedown') {
      pos.x = e.clientX
      pos.y = e.clientY
      addListener(window, 'mousemove', onMousemove)
      addListener(window, 'mouseup', onMouseup)
    } else {//touchstart 
      pos.x = e.touches[0].clientX
      pos.y = e.touches[0].clientY
      addListener(window, 'touchmove', onMousemove)
      addListener(window, 'touchend', onMouseup)
    }

    $el.style[transition] = 'all .2s cubic-bezier(0.215, 0.610, 0.355, 1.000)'
    $el.style[transform] = translate((pos.x - middlePoint.left) + 'px', (pos.y - middlePoint.top) + 'px')
    $el.style.zIndex = maxZ++

    function onMousemove (e) {
      var pos = {}

      if (e.type === 'mousemove') {
        pos.x = e.clientX
        pos.y = e.clientY
      } else {//touchstart
        pos.x = e.touches[0].clientX
        pos.y = e.touches[0].clientY
      }

      $el.style[transition] = ''
	  /*将扑克牌移动到指定的位置*/
      $el.style[transform] = translate((pos.x - middlePoint.left) + 'px', (pos.y - middlePoint.top) + 'px')
    }

    function onMouseup (e) {
      if (e.type === 'mouseup') {
        removeListener(window, 'mousemove', onMousemove)
        removeListener(window, 'mouseup', onMouseup)
      } else {
        removeListener(window, 'touchmove', onMousemove)
        removeListener(window, 'touchend', onMouseup)
      }
    }
  }

  /*把扑克牌挂上*/
  function mount (target) {
    target.appendChild($el)
    self.$root = target
  }
  /*删除扑克牌*/
  function unmount () {
    self.$root && self.$root.removeChild($el)
    self.$root = null
  }
}
/*返回牌的名称，梅花，红桃，方片，黑桃和大王*/
function SuitName (value) {
  return value === 0 ? 'spades' : value === 1 ? 'hearts' : value === 2 ? 'clubs' : value === 3 ? 'diamonds' : 'joker'
}
/*添加事件监听器*/
function addListener (target, name, listener) {
  target.addEventListener(name, listener)
}
/*删除事件监听器*/
function removeListener (target, name, listener) {
  target.removeEventListener(name, listener)
}
