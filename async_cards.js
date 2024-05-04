console.debug('Async / Await Cards')
// ==============================================================
//      SET UP
// ==============================================================

function rename(code) {
    const cardNames = {
        A: 'Ace',
        J: 'Jack',
        Q: 'Queen',
        K: 'King',
        '0': '10'
    }
    const suiteNames = {
        H: 'Hearts',
        D: 'Diamonds',
        S: 'Spades',
        C: 'Clubs'
    }
    let card = cardNames[code.charAt(0)] || code[0];
    let suite = suiteNames[code.charAt(1)] || code[1];
    let name = `${card} of ${suite}`;
    return name
}

function createCard(image, alt) {
    const img = document.createElement('img');
    img.classList.add('card');
    img.src = image;
    img.alt = alt;
    return img
}

// ==============================================================
//      STEP ONE / STEP TWO
// ==============================================================

async function drawCard(count = 1) {
    const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${count}`;
    
    const results = await axios.get(url);
    
    results.data.cards.forEach(card => {
        console.log(rename(card.code));
    })
    
    return results.data
}

//  This function is written in a way that it fill the requirements for both steps depending
//      on the count value input.

// ==============================================================
//      STEP THREE
// ==============================================================

let currentDeck;

const drawButton = document.getElementById('draw');
const cardContainer = document.getElementById('card-container');
const cardCount = document.getElementById('remaining');

async function getDeck() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    
    const results = await axios.get(url);
    
    currentDeck = results.data.deck_id;
}

getDeck();

async function fillPage() {
    const url = `https://deckofcardsapi.com/api/deck/${currentDeck}/draw/?count=1`;
    
    const results = await axios.get(url);
    
    if (results.data.remaining >= 1) {
        cardCount.innerText = `${results.data.remaining} cards left`;
    } else {
        cardCount.innerText = `There are no more cards left`;
    }
    
    
    const card = results.data.cards[0];
    console.log(card);
    const cardImage = createCard(card.image, rename(card.code));
    cardContainer.append(cardImage);
    console.log(rename(card.code));
}

drawButton.addEventListener('click', fillPage)