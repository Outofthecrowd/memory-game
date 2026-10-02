const deck = [
  { id: 1, name: 'Кокша 1', image: './assets/cards/1.png' },
  { id: 2, name: 'Кокша 2', image: './assets/cards/2.png' },
  { id: 3, name: 'Кокша 3', image: './assets/cards/3.png' },
  { id: 4, name: 'Кокша 4', image: './assets/cards/4.png' },
  { id: 5, name: 'Кокша 5', image: './assets/cards/5.png' },
  { id: 6, name: 'Кокша 6', image: './assets/cards/6.png' },
  { id: 7, name: 'Кокша 7', image: './assets/cards/7.png' },
  { id: 8, name: 'Кокша 8', image: './assets/cards/8.png' }
];

const cardBack = './assets/textures/back.png';

const title = document.createElement('h1');

    title.className = 'game-title';
    title.textContent = 'Найди пару';

document.body.append(title);

const header = document.createElement('header');

    const newGameButton = document.createElement('button');
    newGameButton.type = 'button';
    newGameButton.textContent = 'Новая игра';

    const recordsButton = document.createElement('button');
    recordsButton.type = 'button';
    recordsButton.textContent = 'Рекорды';

header.append(newGameButton, recordsButton);

const main = document.createElement('main');

    const counters = document.createElement('div');
    counters.className = 'counters';

        const movesCounter = document.createElement('p');
        movesCounter.textContent = 'Ходы: 0';

        const pairsCounter = document.createElement('p');
        pairsCounter.textContent = 'Найдено пар: 0';

    counters.append(movesCounter, pairsCounter);

    const gameBoard = document.createElement('div');
    gameBoard.className = 'game-board';


        const cards = [];
            for (let i = 0; i < 16; i += 1) {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'card';
            card.dataset.state = 'closed';
            card.setAttribute('aria-label', `Карточка ${i + 1}`);
            const image = document.createElement('img');
            image.src = cardBack;
            image.alt = '';

            card.append(image);
            cards.push(card);''
            gameBoard.append(card);
            }


main.append(counters, gameBoard);

document.body.append(header, main);