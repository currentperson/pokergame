/**/
export default function (target) {
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
