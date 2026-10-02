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

        
        const delay = 800;
        let moves = 0;
        let foundPairs = 0;
        let count = 0;
        let firstCard = null;
        let secondCard = null;
        let closeCardsTimer = null;

        function startNewGame() {
            clearTimeout(closeCardsTimer);
            closeCardsTimer = null;
            moves = 0;
            foundPairs = 0;
            count = 0;
            firstCard = null;
            secondCard = null;
            

            movesCounter.textContent = `Ходы: ${moves}`;
            pairsCounter.textContent = `Найдено пар: ${foundPairs}`;

            gameBoard.replaceChildren();

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

                const backImage = document.createElement('img');
                backImage.className = 'card-back';
                backImage.src = cardBack;
                backImage.alt = '';

                const frontImage = document.createElement('img');
                frontImage.className = 'card-front';
                frontImage.src = cardData.image;
                frontImage.alt = cardData.name;

                card.append(backImage, frontImage);
                card.addEventListener('click', () => {
                    handleCardClick(card, cardData);
                });
            
       
                gameBoard.append(card);
            }
        }

        function handleCardClick(card, cardData) {
            if (card.dataset.state !== 'closed' || count >= 2) {
                return;
                }

            card.dataset.state = 'open';
            card.setAttribute('aria-label', cardData.name);

            count += 1;

            if (count === 1) {
                firstCard = card;
                } else {
                secondCard = card;
                checkPair(firstCard, secondCard);
                }
            }    

        function checkPair(a, b){
            moves += 1;
            movesCounter.textContent = `Ходы: ${moves}`;

            if (a.dataset.pairId === b.dataset.pairId) {
                a.dataset.state = 'matched';
                b.dataset.state = 'matched';

                foundPairs += 1;
                pairsCounter.textContent = `Найдено пар: ${foundPairs}`;

                count = 0;
                firstCard = null;
                secondCard = null;
            } else {
                closeCardsTimer = setTimeout(function() {
                    a.dataset.state = 'closed';
                    b.dataset.state = 'closed';

                    a.setAttribute('aria-label', 'Закрытая карточка');
                    b.setAttribute('aria-label', 'Закрытая карточка');

                    count = 0;
                    firstCard = null;
                    secondCard = null;
                    closeCardsTimer = null;
                    }, delay);

            }
        }


newGameButton.addEventListener('click', startNewGame);
startNewGame();

main.append(counters, gameBoard);

document.body.append(header, main);