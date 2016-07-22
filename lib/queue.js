

export default function (target) {
  var array = Array.prototype

  var queueing = []

  target.queue = queue
  target.queued = queued

  return target

  function queued (action) {
    return function () {
      var self = this
      var args = arguments
      console.log("[Queue.js]: args is " + args);
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
