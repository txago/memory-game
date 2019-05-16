// Global vars
const deck = document.querySelector('.deck');
const restart = document.querySelector(".restart-button");

// Empty array list that holds all of the cards
let cardsList = [];

// Matched cards vars
let matchedCards = 0;
const totalMatches = 8;

// Moves vars
let moves = 0;
let movesCount = document.querySelector('.counter');

// Clock vars
let timeStart;
let clockOn = false;
let hours = 0;
let hoursLabel = document.querySelector('.hour');
let minutes = 0;
let minutesLabel = document.querySelector('.minutes');
let seconds = 0;
let secondsLabel = document.querySelector('.seconds');
const totalTime = document.querySelector('.clock');

// Modal vars
const modal = document.querySelector('.overlay-modal');
const modalCloseX = document.querySelector('.modal-close');
const modalButton = document.querySelector('.modal-button');

// Rate vars
const stars = document.querySelector('.stars').childNodes;
const starsStats = document.querySelector('.stars');

// Function to randomize the cards on the deck
function randomDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (let card of shuffledCards) {
    deck.appendChild(card);
  }
}
randomDeck();

// Event Delegation for cards' clicking and matching behaviour
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') &&
  !clickTarget.classList.contains('match') && cardsList.length < 2 &&
  !cardsList.includes(clickTarget)) {
    flipCard(clickTarget);
    cardsList.push(clickTarget);
    if (cardsList.length === 2) {
      countMoves();
      matchCards(clickTarget);
    }
    if (clockOn === false) {
      startClock();
      clockOn = true;
    }
  }
});

// Function to flip single card
function flipCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

// Function to match cards
function matchCards() {
  if (cardsList[0].innerHTML === cardsList[1].innerHTML) {
    cardsList[0].classList.toggle('match');
    cardsList[1].classList.toggle('match');
    cardsList = [];
    matchedCards++;
    if (matchedCards === totalMatches) {
      completeGame();
    }
  } else {
    setTimeout(() => {
      flipCard(cardsList[0]);
      flipCard(cardsList[1]);
      cardsList = [];
    }, 800);
  }
}

// Function to count the moves
function countMoves() {
    moves++;
    if (moves === 1) {
        movesCount.innerHTML = '1 move';
    } else {
        movesCount.innerHTML = `${moves} moves`;
    }
    starsRating();
}

// Function to set the stars rating
function starsRating() {
  if (moves === 6) {
    stars[9].innerHTML = '<i class="far fa-star">';
  } else if (moves === 12) {
    stars[7].innerHTML = '<i class="far fa-star">';
  } else if (moves === 24) {
    stars[5].innerHTML = '<i class="far fa-star">';
  } else if (moves === 32) {
    stars[3].innerHTML = '<i class="far fa-star">';
  } else if (moves === 44) {
    stars[1].innerHTML = '<i class="far fa-star">';
  }
}

// Function to start the clock
function startClock() {
  if (seconds === 0) {
    seconds++;
  }
  timeStart = setInterval(() => {
    hoursLabel.innerHTML = `${hours}`;
    minutesLabel.innerHTML = `${minutes}`;
    secondsLabel.innerHTML = `${seconds}`;
    fixClock(seconds, secondsLabel);
    fixClock(minutes, minutesLabel);
    fixClock(hours, hoursLabel);
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    } else if (minutes == 60) {
      hours++;
      minutes = 0;
    }
  }, 1000);
}

// Function to fix clock format
function fixClock(x, y) {
    if (x < 10) {
        return (y.innerHTML = `0${x}`);
    } else {
        return (y.innerHTML = `${x}`);
    }
}

// Event delegation to restart the board from restart link
restart.addEventListener('click', restartGame);

// Function to complete the game
function completeGame() {
  clearInterval(timeStart);
  modalStats();
  openModal();
}

// Function to diplay winning modal
function openModal() {
  const modal = document.querySelector('.overlay-modal');
  modal.removeAttribute('style');
}
openModal();

// Function to close winning modal
function closeModal() {
  const modal = document.querySelector('.overlay-modal');
  modal.setAttribute('style', 'display: none;');
}
closeModal();

// Function to display stats to winning modal
function modalStats() {
  const modalStars = document.querySelector('.stats-stars');
  const modalTime = document.querySelector('.stats-time');
  const modalMoves = document.querySelector('.stats-moves');
  modalStars.innerHTML = starsStats.innerHTML;
  modalTime.innerHTML = totalTime.innerHTML;
  modalMoves.innerHTML = `Total moves: ${moves}`;
}

// Event delegation to restart the board from winning modal button
modalButton.addEventListener('click', restartGame);

// Event delegation to close the winning modal using the X
modalCloseX.addEventListener('click', closeModal);

// Function to restart the game
function restartGame() {
  modal.setAttribute('style', 'display: none;');
  matchedCards = 0;
  cardsList = [];
  clearInterval(timeStart);
  clockOn = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  hoursLabel.innerText = '00';
  minutesLabel.innerText = '00';
  secondsLabel.innerText = '00';
  clearInterval(timeStart);
  moves = 0;
  movesCount.innerText = 'No moves';
  stars[9].innerHTML = '<i class="fas fa-star">';
  stars[7].innerHTML = '<i class="fas fa-star">';
  stars[5].innerHTML = '<i class="fas fa-star">';
  stars[3].innerHTML = '<i class="fas fa-star">';
  stars[1].innerHTML = '<i class="fas fa-star">';
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
  randomDeck();
}

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
