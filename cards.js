console.debug('Cards')
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

// ==============================================================
//      STEP ONE / STEP TWO
// ==============================================================

function drawCards(count = 1) {
    return axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=${count}`)
        .then(response => {
            console.log(`Deck id: ${response.data.deck_id}`);
            const cards = response.data.cards.map(card => {
                console.log(rename(card.code))
                return Promise.resolve(card);
            });
            console.log(`${response.data.remaining} cards left`)
            return Promise.all(cards);
        })
        .catch(err => console.error(err))
}

//  This function is written in a way that it fill the requirements for both steps depending
//      on the count value input.

// ==============================================================
//      STEP THREE
// ==============================================================

let currentDeck;

function getDeck() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
            currentDeck = response.data.deck_id;
        })
}

getDeck()

//  DON'T DELETE YET
// function fillPage() {
//     axios.get(`https://deckofcardsapi.com/api/deck/${currentDeck}/draw/?count=1`)
//         .then(response => {
//             console.log(`Deck id: ${response.data.deck_id}`);
//             const card = response.data.cards[0];
//             const cardName = rename(card.code);
//             const image = card.image;
//             const remaining = response.data.remaining;
//             console.log(cardName);
//             console.log(image);
//             console.log(remaining);
//             return Promise.resolve(card);
//         })
// }

function fillPage() {
    axios.get(`https://deckofcardsapi.com/api/deck/${currentDeck}/draw/?count=1`)
        .then(response => {
            console.log(`Deck id: ${response.data.deck_id}`);
            const card = response.data.cards[0];
            const cardName = rename(card.code);
            const image = card.image
            const remaining = response.data.remaining;
            console.log(cardName);
            
            cardCount.innerText = `${remaining} cards left`;
            
            const img = document.createElement('img');
            img.classList.add("card");
            img.src = image;
            img.alt = cardName;
            cardContainer.append(img)
            return Promise.resolve(card);
        })
        .catch(err => console.error(err))
}

// ==============================================================
//      EVENT LISTENERS
// ==============================================================

const drawButton = document.getElementById('draw');
const cardContainer = document.getElementById('card-container');
const cardCount = document.getElementById('remaining');

drawButton.addEventListener('click', fillPage)