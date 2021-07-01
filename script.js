const grid = document.getElementById('grid');
const result = document.getElementById('result');

const DEFAULT_IMAGE_URL = './img/blank.png';

const cardsWon = [];
let selectedCards = [];
let chosenCardId = [];

const items = [
    {
        name: 'console',
        img: './img/game-console.png',
    },
    {
        name: 'ghost',
        img: './img/ghost.png'
    },    {
        name: 'heart',
        img: './img/heart.png'
    },    {
        name: 'lottery',
        img: './img/lottery.png'
    },    {
        name: 'pokeball',
        img: './img/pokeball.png'
    },    {
        name: 'rubik',
        img: './img/rubik.png'
    }
];

const checkForMatch = () => {
    const cards = document.querySelectorAll('img');
    const pickOneId = chosenCardId[0];
    const pickTwoId = chosenCardId[1];

    if (pickOneId === pickTwoId) {
        cardsWon.push(selectedCards)
    } else {
        cards.forEach(item => {
            if (item.getAttribute('data-id') === pickOneId
            || item.getAttribute('data-id') === pickTwoId) {
                item.setAttribute('src', DEFAULT_IMAGE_URL);
            }
        })
    }

    chosenCardId = [];
    selectedCards = [];

    result.textContent = cardsWon.length;
console.log(cardsWon.length , items.length)
    if (cardsWon.length >= items.length) {
        result.textContent = 'Congratulations! You Won'
    }
}


const flipCard = (card) => {
    let cardId = card.getAttribute('data-id');
    selectedCards.push(items[cardId].name)
    chosenCardId.push(cardId);
    card.setAttribute('src', items[cardId].img);

    if (chosenCardId.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

const createCard = (id) => {
    const card = document.createElement('img');
    card.setAttribute('src', DEFAULT_IMAGE_URL);
    card.classList.add('card')
    card.setAttribute('data-id', id);
    card.addEventListener('click', () => {
        flipCard(card);
    });
    grid.appendChild(card)
} 

const createBoard = () => {
    items.sort(() => 0.5 - Math.random())
    for (let y = 0; y < 2; y ++) {
        for(let i = 0; i < items.length; i++) {
            createCard(i)
        }
    }
}

createBoard();