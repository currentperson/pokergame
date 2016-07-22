'use strict';

var Deck = (function () {
  'use strict';

  var style = document.createElement('p').style;
  var memoized = {};

  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
    return memoized[param]
  }

  if (typeof style[param] !== 'undefined') {
    memoized[param] = param
    return param
  }

  var camelCase = param[0].toUpperCase() + param.slice(1)
  var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o']
  var test

  for (var i = 0, len = prefixes.length; i < len; i++) {
    test = prefixes[i] + camelCase
    if (typeof style[test] !== 'undefined') {
      memoized[param] = test
      return test
    }
  }
  }

  var transform = prefix('transform');
  var $p = document.createElement('p');

  document.body.appendChild($p);

  $p.style[transform] = 'translate3d(1px,1px,1px)';

  var has3d = $p.style[transform];

  has3d = has3d != null && has3d.length && has3d !== 'none';

  document.body.removeChild($p);

  function translate(a, b, c) {
    c = c || 0;
    if (has3d) {
      return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
      return 'translate(' + a + ', ' + b + ')';
    }
  }

  function poker(card, $el) {
    var transform = prefix('transform')
  var transition = prefix('transition')
  var transitionDelay = prefix('transitionDelay')

  card.poker = function (i, len, cb) {
    console.log("[Card-poker.js]: i is " + i + ",len is " + len);
    var delay = i * 250
    var target = {
      x: (i - 2.05) * 110,
      y: -125
    }
    console.log("[Card-poker.js]: delay is " + i + ",target is " + target);
    setTimeout(function () {
      $el.style.zIndex = (len - 1) + i
    }, delay)

    setTimeout(function () {
      $el.style[transition] = 'all .25s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      $el.style[transform] = translate(target.x + '%', target.y + '%')
    }, delay + 25)

    setTimeout(function () {
      $el.style[transition] = ''
      cb(i)
    }, delay + 250)
  }
  }

  function fan(card, $el) {
    var transform = prefix('transform')
  var transformOrigin = prefix('transformOrigin')
  var transition = prefix('transition')
  var transitionDelay = prefix('transitionDelay')

  card.fan = function (i, len, cb) {
    console.log("[Card-fan.js]: i is " + i + ",len is " + len);
    var z = i / 4
    var delay = i * 10
    var rot = i / (len - 1) * 260 - 130
    console.log("[Card-fan.js]: z is " + z + ",rot is " + rot);
    $el.style[transformOrigin] = '50% 110%'

    setTimeout(function () {
      $el.style[transition] = 'all .3s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      $el.style[transitionDelay] = delay / 1000 + 's'
      $el.style[transform] = translate(-z + 'px', -z + 'px')
      $el.style.zIndex = i

      setTimeout(function () {
        $el.style[transitionDelay] = ''
        $el.style[transform] = translate(0, 0) + 'rotate(' + rot + 'deg)'
      }, 300 + delay)
    }, 0)

    setTimeout(function () {
      cb(i)
    }, 1000 + delay)
  }

  }

  function bysuit(card, $el) {
    var transform = prefix('transform')
  var transition = prefix('transition')
  var transitionDelay = prefix('transitionDelay')

  var value = card.value
  var suit = card.suit

  card.bysuit = function (cb) {
    var i = card.i
    var delay = i * 10
    var posX = -(6.75 - value) * 15
    var posY = -(1.5 - suit) * 105

    setTimeout(function () {
      $el.style[transition] = 'all .5s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      $el.style[transitionDelay] = delay / 1000 + 's'
      $el.style[transform] = translate(posX + '%', posY + '%')
      $el.style.zIndex = i

      setTimeout(function () {
        $el.style[transition] = ''
        cb(i)
      }, 500 + delay)

    }, 0)
  }
  }

  function sort(card, $el) {
      var transform = prefix('transform')
  var transition = prefix('transition')

  card.sort = function (n, cb, reverse) {
    console.log("[Card-sort.js]: n is " + n);
	//alert("ssss");
	var z = n / 4
    var delay = n * 10

    setTimeout(function () {
      $el.style[transition] = 'all .4s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      $el.style[transform] = translate(-z + 'px', '-150%')
    }, delay)

    setTimeout(function () {
      $el.style.zIndex = n
    }, 200 + delay)

    setTimeout(function () {
      $el.style[transform] = translate(-z + 'px', -z + 'px')

      setTimeout(function () {
        $el.style[transition] = ''
        card.x = -z
        card.y = -z
        cb(n)
      }, 500)

    }, 400 + delay)
  }
  }

  function plusMinus(value) {
    var plusminus = Math.round(Math.random()) ? -1 : 1;

    return plusminus * value;
  }

  function shuffle(card, $el) {
    var transform = prefix('transform')
  var transition = prefix('transition')
  var transitionDelay = prefix('transitionDelay')

  card.shuffle = function (cb) {
    var i = card.pos
	console.log("[Card-shuffle.js]: i is " + i);
    var z = i / 4
    var offsetX = plusMinus(Math.random() * 40 + 30)
    console.log("[Card-shuffle.js]: offsetX is " + offsetX);
    var delay = i * 2

    $el.style[transition] = 'all .2s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
    $el.style[transitionDelay] = delay / 1000 + 's'

    setTimeout(function () {
      $el.style[transform] = translate(offsetX + '%', -z + 'px')
    }, 0)

    setTimeout(function () {
      $el.style[transitionDelay] = ''
      $el.style.zIndex = i
    }, 100 + delay)

    setTimeout(function () {
      $el.style[transform] = translate(-z + 'px', -z + 'px')

      setTimeout(function () {
        $el.style[transition] = ''
        cb(i)
      }, 200)

    }, 200 + delay)
  }
  }

  function intro(card, $el) {
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
		console.log("[Card-intro.js]: cb is " + cb);
      }, 1250 + delay)
    }, 500)
  }
  }

  function createElement(type) {
    return document.createElement(type);
  }

  var maxZ = 52;
  /*构建一张牌，指定位置和zindex的值，定义移动的函数*/
  function Card(i) {
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
  /*$el就是整个牌的布局*/
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
  /*移动牌到指定的位置(-z,-z)*/
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

    return self;

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

  /*动作的设定*/
 function easing(name) {
  if (name === 'cubicInOut') {
    return 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
  }
}

  function introModule(deck) {
   deck.intro = deck.queued(intro)

  function intro (next) {
    var cards = deck.cards
	console.log("[Deck-intro.js]: cards is ");
	console.log(cards);
    cards.forEach(function (card, i) {
      card.intro(i, function (i) {
        if (i === cards.length - 1) {
          next()
        }
      })
    })
  }
  }

  function bysuitModule(deck) {
    deck.bysuit = deck.queued(bysuit);

    function bysuit(next) {
      var cards = deck.cards;

      cards.forEach(function (card) {
        card.bysuit(function (i) {
          if (i === cards.length - 1) {
            next();
          }
        });
      });
    }
  }

  function pokerModule(deck) {
     deck.poker = deck.queued(poker)

  function poker (next) {
    var cards = deck.cards
    var len = cards.length
    console.log("[Deck-poker]: cards is ");
	console.log(cards);
    cards.slice(-5).reverse().forEach(function (card, i) {
      card.poker(i, len, function (i) {
        if (i === 4) {
          next()
        }
      })
    })
  }
  }

  function fanModule(deck) {
   deck.fan = deck.queued(fan)

  function fan (next) {
    var cards = deck.cards
    var len = cards.length
    console.log("[Deck-fan.js]: cards is ");
	console.log(cards);
    cards.forEach(function (card, i) {
      card.fan(i, len, function (i) {
        if (i === cards.length - 1) {
          next()
        }
      })
    })
  }
  }

  function sortModule(deck) {
    deck.sort = deck.queued(sort);

    function sort(next, reverse) {
      var cards = deck.cards;

      cards.sort(function (a, b) {
        if (reverse) {
          return a.i - b.i;
        } else {
          return b.i - a.i;
        }
      });

      cards.forEach(function (card, i) {
        card.sort(i, function (i) {
          if (i === cards.length - 1) {
            next();
          }
        }, reverse);
      });
    }
  }

  function fisherYates(array) {
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

  function shuffleModule(deck) {

    deck.shuffle = deck.queued(shuffle)

  function shuffle (next) {
    var cards = deck.cards

    fisherYates(cards)
    console.log("[Deck-shuffle.js]: cards is ");
	console.log(cards);
    cards.forEach(function (card, i) {
      card.pos = i

      card.shuffle(function (i) {
        if (i === cards.length - 1) {
          next()
        }
      })
    })
    return
  }
  }

  function queue(target) {
   var array = Array.prototype

  var queueing = []

  target.queue = queue
  target.queued = queued

  return target

  function queued (action) {
    return function () {
      var self = this
      var args = arguments
      console.log("[Queue.js]: args is ");
	  console.log(args);
      queue(function (next) {
        action.apply(self, array.concat.apply(next, args))
      })
    }
  }

  function queue (action) {
    if (!action) {
      return
    }

    queueing.push(action)
    console.log("[Queue.js]: queueing in queue is " + queueing);
    if (queueing.length === 1) {
      next()
    }
  }
  function next () {
	console.log("[Queue.js]: queueing[0] is " + queueing[0]);
    queueing[0](function (err) {
      if (err) {
        throw err
      }
      console.log("[Queue.js]: queueing is " + queueing);
      queueing = queueing.slice(1)
      console.log("[Queue.js]: than the args is " + queueing);
      if (queueing.length) {
        next()
      }
    })
   }
  }
  
  function observable(target) {
	  target || (target = {})
  var listeners = {}

  target.on = on
  target.one = one
  target.off = off
  target.trigger = trigger

  return target
  /*附加一个事件*/
  function on (name, cb, ctx) {
    listeners[name] || (listeners[name] = [])
    listeners[name].push({cb, ctx})
  }
  /*附加一个事件，这个事件只运行一次就删除自己*/
  function one (name, cb, ctx) {
    listeners[name] || (listeners[name] = [])
    listeners[name].push({
      cb, ctx, once: true
    })
  }
  /**/
  function trigger (name) {
    var self = this
    var args = Array.prototype.slice(arguments, 1)

    var currentListeners = listeners[name] || []

    currentListeners.filter(function (listener) {
      listener.cb.apply(self, args)

      return !listener.once
    })
  }
  /*关闭事件*/
  function off (name, cb) {
    if (!name) {
      listeners = {}
      return
    }

    if (!cb) {
      listeners[name] = []
      return
    }

    listeners[name] = listeners[name].filter(function (listener) {
      return listener.cb !== cb
    })
  }
  }

  function Deck(jokers) {
   var cards = new Array(jokers ? 55 : 52)

  var $el = createElement('div')
  var self = observable({mount, unmount, cards, $el})
  var $root

  queue(self)
  shuffleModule(self)
  sortModule(self)
  fanModule(self)
  pokerModule(self)
  bysuitModule(self)
  introModule(self)

  $el.classList.add('deck')

  var card

  for (var i = 0, len = cards.length; i < len; i++) {
    card = cards[i] = Card(i)
    card.mount($el)
  }

  return self
  /*root节点下添加元素*/
  function mount (root) {
    $root = root
    $root.appendChild($el)
	//alert(root);
  }
  /*root节点下删除元素*/
  function unmount () {
    $root.removeChild($el)
  }
}
Deck.Card = Card
Deck.easing = easing
Deck.prefix = prefix
Deck.translate = translate
  return Deck;
})();
