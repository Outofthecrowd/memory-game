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

const backgroundMusic = document.createElement('audio');

    backgroundMusic.src = './assets/audio/background.mp3';
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;

document.body.append(backgroundMusic);

document.addEventListener('click', () => {
  backgroundMusic.play().catch((error) => {
    console.error('Не удалось включить музыку:', error);
        });
    }, { once: true });

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

        let moves = 0;
        let foundPairs = 0;

        function startNewGame() {
            moves = 0;
            foundPairs = 0;

            movesCounter.textContent = `Ходы: ${moves}`;
            pairsCounter.textContent = `Найдено пар: ${foundPairs}`;

            gameBoard.replaceChildren();
            cards.length = 0;

            const gameDeck = [...deck, ...deck];
                for (let i = gameDeck.length - 1; i > 0; i -= 1) {
                    const randomIndex = Math.floor(Math.random() * (i + 1));

                    [gameDeck[i], gameDeck[randomIndex]] =
                    [gameDeck[randomIndex], gameDeck[i]];
                    }




            for (let i = 0; i < gameDeck.length; i += 1) {
                const cardData = gameDeck[i];

                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'card';

                card.dataset.state = 'closed';
                card.dataset.pairId = cardData.id;
                card.setAttribute('aria-label', `Карточка ${i + 1}`);

                const image = document.createElement('img');
                image.src = cardBack;
                image.alt = '';

                card.append(image);
                card.addEventListener('click', () => {
                    if (card.dataset.state !== 'closed') {
                        return;
                        }

                    card.dataset.state = 'open';
                    image.src = cardData.image;
                    image.alt = cardData.name;
                    card.setAttribute('aria-label', cardData.name);
                    });
                cards.push(card);
                gameBoard.append(card);
            }
        }
newGameButton.addEventListener('click', startNewGame);
startNewGame();

main.append(counters, gameBoard);

document.body.append(header, main);