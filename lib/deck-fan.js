
export default function (deck) {
  deck.fan = deck.queued(fan)

  function fan (next) {
    var cards = deck.cards
    var len = cards.length
    console.log("[Deck-fan.js]: cards is " + card);
    cards.forEach(function (card, i) {
      card.fan(i, len, function (i) {
        if (i === cards.length - 1) {
          next()
        }
      })
    })
  }
}
