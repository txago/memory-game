// Cards list array
const brands = ['behance', 'dribbble', 'facebook', 'instagram', 'linkedin',
'snapchat', 'twitter', 'youtube'];

// Global vars
const cardsDeck = document.querySelector('#brand-deck');
let moves = 0;
const movesCounter = document.querySelector(".moves");

// Cards arrays
let flippedCards = [];
let matchedCards = [];

// Deck EventListener
cardsDeck.addEventListener('click', cardClick);

// Cards interaction
function cardClick(evt) {
  let clickedCard = evt.target;

  if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('open', 'show', 'match')) {
    clickedCard.classList.add('open', 'show');
    flippedCards.push(clickedCard);
  }

  if (flippedCards.length === 2) {
    clickNum();

    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
      // Flipped cards match!
      matched();
    } else {
      // Flipped cards doesn't match!
      setTimeout(() => {
        flippedCards[0].classList.remove('open', 'show');
        flippedCards[1].classList.remove('open', 'show');
        flippedCards = [];
      }, 1000);
    }
  }
}

// Flipped cards match!
function matched() {
  flippedCards[0].classList.add('match');
  flippedCards[1].classList.add('match');
  matchedCards.push(flippedCards[0]);
  matchedCards.push(flippedCards[1]);
  flippedCards = [];
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Click moves
function clickNum() {
    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = '1 move';
    } else {
        movesCounter.innerHTML = `${moves} moves`;
    }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
