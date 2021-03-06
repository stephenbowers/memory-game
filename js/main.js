/* === COUNTER === */
let count = 0;
let matchCount = 0;
let moveCount = 0;
const CURRENT_COUNT = document.getElementById('current-count');

/* === FLIPPING CARDS === */
const CARD_BACKS = document.getElementsByClassName('card-back');
const CARD_FRONTS = document.getElementsByClassName('card-front');
let notMatchedCards = document.getElementsByClassName('not-matched');
const BOARD = document.getElementById('board');

for(let cardBack of CARD_BACKS) {
    cardBack.addEventListener('click', function(event) {
        event.target.style.zIndex = '-2';

        if (!event.target.previousElementSibling.classList.contains('selected') && !event.target.previousElementSibling.classList.contains('matched')) {
            event.target.previousElementSibling.classList.add('selected');
        }

        count += 1;
    });
}

/* === MATCHING CARDS === */
let selectedCards = document.getElementsByClassName('selected');

BOARD.addEventListener('click', function() {
    if (count === 1) {
        startTimer();
    }
    if (count > 1 && count % 2 === 0) {
        let selectedCard1 = selectedCards[0];
        let selectedCard2 = selectedCards[1];
        let symbol1 = selectedCard1.firstElementChild.className;
        let symbol2 = selectedCard2.firstElementChild.className;
        if (symbol1 === symbol2) {
            selectedCard1.classList.add('matched');
            selectedCard2.classList.add('matched');
            selectedCard1.classList.remove('selected');
            selectedCard2.classList.remove('selected');
            selectedCard1.nextElementSibling.style.display = 'none';
            selectedCard2.nextElementSibling.style.display = 'none';
            matchCount += 1;
            moveCount += 1;
            CURRENT_COUNT.innerText = moveCount;
            starCheck();
            winCheck();
        } if (symbol1 !== symbol2) {
            moveCount += 1;
            CURRENT_COUNT.innerText = moveCount;
            selectedCard1.classList.add('not-matched');
            selectedCard2.classList.add('not-matched');
            selectedCard1.nextElementSibling.style.display = 'none';
            selectedCard2.nextElementSibling.style.display = 'none';
            setTimeout(function() {
                selectedCard1.classList.remove('not-matched');
                selectedCard2.classList.remove('not-matched');
                selectedCard1.nextElementSibling.style.zIndex = '0';
                selectedCard2.nextElementSibling.style.zIndex = '0';
                selectedCard1.nextElementSibling.style.display = 'initial';
                selectedCard2.nextElementSibling.style.display = 'initial';
            }, 1000);
            selectedCard1.classList.add('not-matched');
            selectedCard2.classList.add('not-matched');
            selectedCard1.classList.remove('selected');
            selectedCard2.classList.remove('selected');
            starCheck();
        }
    }
});

/* === SHUFFLING CARDS === */
function shuffle() {
    let symbols = [
        'fas fa-heart',
        'fas fa-star',
        'fas fa-cloud',
        'fas fa-frog',
        'fas fa-chess-rook',
        'fas fa-chess-king',
        'far fa-eye-slash',
        'fas fa-crow',
        'fas fa-heart',
        'fas fa-star',
        'fas fa-cloud',
        'fas fa-frog',
        'fas fa-chess-rook',
        'fas fa-chess-king',
        'far fa-eye-slash',
        'fas fa-crow'
    ];

    // Randomize Symbols Array
    /*
    Fisher-Yates Algorithm adapted from the following tutorial.
    It seemed like the best option.
    Tutorial: https://www.kirupa.com/html5/shuffling_array_js.htm
    */
    for (let i = symbols.length - 1; i >= 0; i--) {
        let index = Math.floor(Math.random() * (i + 1));
        let symbol = symbols[index];

        symbols[index] = symbols[i];
        symbols[i] = symbol;
    }
        
    // Assign Symbols
    let cardCount = 0;
    for(let cardFront of CARD_FRONTS) {
        let icon = cardFront.firstElementChild;
        icon.className = symbols[cardCount];
        cardCount++;
    }
};

shuffle();

/* === Restart === */
const RESTART_BTN = document.getElementById('restart-btn');

RESTART_BTN.addEventListener('click', function() {
    count = 0;
    moveCount = 0;
    CURRENT_COUNT.innerText = moveCount;
    matchCount = 0;
    finalTime = 0;
    finalTimeDisp.innerHTML = '00:00';
    document.getElementById('time').innerHTML = '00:00';
    stars.innerHTML = '<i class="fas fa-star"><i class="fas fa-star"></i><i class="fas fa-star">';

    for(let cardBack of CARD_BACKS) {
        cardBack.className = 'card-back';
        cardBack.style.zIndex = '0';
        cardBack.style.display = 'initial';
    }
    for(let cardFront of CARD_FRONTS) {
        cardFront.className = 'card-front';
    }

    shuffle();
});

/* === Timer === */
let finalTime = 0;
function startTimer() {
    /* 
    Timer function adapted from W3Schools How To
    Link: https://www.w3schools.com/howto/howto_js_countdown.asp
    */
    if (count === 1) {
    // Get current time to set as start
    let start = new Date().getTime();
    
    let timeCounter = setInterval(function() {
        let now = new Date().getTime();
        // Compare difference between new current time & start time
        let diff = now - start;
        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (secs < 10) {
            secs = '0' +secs;
        }
        
        document.getElementById('time').innerHTML = mins + ':' + secs;

        if (matchCount === 8) {
            finalTime = mins + ':' + secs;
            finalTimeDisp.innerHTML = finalTime;
            clearInterval(timeCounter);
        }

        RESTART_BTN.addEventListener('click', function() {
            clearInterval(timeCounter);
        })
    }, 1000);
    }
};

/* === Star Rating === */
let stars = document.getElementById('stars');

function starCheck() {
    if (count > 16 && count <= 24) {
        stars.innerHTML = '<i class="fas fa-star"><i class="fas fa-star"></i><i class="far fa-star"></i>';
    }else if (count > 32) {
        stars.innerHTML = '<i class="fas fa-star"><i class="far fa-star"></i><i class="far fa-star"></i>';
    }
}

/* === Winning === */
let modal = document.getElementById('modal');
let finalCountDisp = document.getElementById('final-count');
let finalTimeDisp = document.getElementById('final-time');
let finalRating = document.getElementById('final-rating');

function winCheck() {
    if (matchCount === 8) {
        modal.style.display = 'block';
        finalCountDisp.innerHTML = moveCount;
        finalRating.innerHTML = stars.innerHTML;
    };
};

const AGAIN_BTN = document.getElementById('again-btn');

AGAIN_BTN.addEventListener('click', function() {
    count = 0;
    moveCount= 0;
    CURRENT_COUNT.innerText = moveCount;
    matchCount = 0;
    document.getElementById('time').innerHTML = '00:00';
    stars.innerHTML = '<i class="fas fa-star"><i class="fas fa-star"></i><i class="fas fa-star">';

    for(let cardBack of CARD_BACKS) {
        cardBack.className = 'card-back';
        cardBack.style.zIndex = '0';
        cardBack.style.display = 'initial';
    }
    for(let cardFront of CARD_FRONTS) {
        cardFront.className = 'card-front';
    }

    shuffle();
    modal.style.display = 'none';
});
