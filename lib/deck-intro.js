
export default function (deck) {
  deck.intro = deck.queued(intro)

  function intro (next) {
    var cards = deck.cards
	console.log("[Deck-intro.js]: cards is " + cards);
    cards.forEach(function (card, i) {
      card.intro(i, function (i) {
        if (i === cards.length - 1) {
          next()
        }
      })
    })
  }
}
