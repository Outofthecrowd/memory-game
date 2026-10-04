const DECK = [
  { id: 1, name: 'Маня Понич', image: './assets/cards/1.png' },
  { id: 2, name: 'Гычеедка', image: './assets/cards/2.png' },
  { id: 3, name: 'Шпендель', image: './assets/cards/3.png' },
  { id: 4, name: 'Лесной Кадаврик', image: './assets/cards/4.png' },
  { id: 5, name: 'Ефросинья Валерьевна', image: './assets/cards/5.png' },
  { id: 6, name: 'Грык', image: './assets/cards/6.png' },
  { id: 7, name: 'Чунявый Бенедикт', image: './assets/cards/7.png' },
  { id: 8, name: 'Валентин Четвертый', image: './assets/cards/8.png' }
];
const CARD_BACK = './assets/textures/back.png';
const MUSIC = './assets/audio/background.mp3';


const backgroundMusic = document.createElement('audio');

    backgroundMusic.src = MUSIC;
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;

document.body.append(backgroundMusic);

document.addEventListener('click', () => {
  backgroundMusic.play().catch((error) => {
    console.error('Не удалось включить музыку:', error);
        });
    }, { once: true });

const header = document.createElement('header');

    const title = document.createElement('h1');
    title.className = 'game-title';
    title.textContent = 'Найди пару';

    const newGameButton = document.createElement('button');
    newGameButton.type = 'button';
    newGameButton.textContent = 'Новая игра';

    const recordsButton = document.createElement('button');
    recordsButton.type = 'button';
    recordsButton.textContent = 'Рекорды';

    const headerButtons = document.createElement('div');
    headerButtons.className = 'header-buttons';
    headerButtons.append(newGameButton, recordsButton);

header.append(title, headerButtons);

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
            generateGameBoard();

        }

        function generateGameBoard() {

            gameBoard.replaceChildren();

            const gameDeck = [...DECK, ...DECK];
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
                backImage.src = CARD_BACK;
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
            if (foundPairs === DECK.length){
                        finish(moves);
                    }
        }

       function finish (moves){
            victoryResult.textContent = `Все пары кокш найдены за ${moves} ходов!`;
            victoryModal.showModal();
        }


const victoryModal = document.createElement('dialog');
victoryModal.className = 'victory-modal';

const victoryImage = document.createElement('img');
victoryImage.className = 'victory-image';
victoryImage.src = './assets/victory/victory.png';
victoryImage.alt = 'Победа!';

const victoryResult = document.createElement('p');


const modalNewGameButton = document.createElement('button');
modalNewGameButton.type = 'button';
modalNewGameButton.textContent = 'Новая игра';

modalNewGameButton.addEventListener('click', () => {
    victoryModal.close();
    startNewGame();
});

const modalCloseButton = document.createElement('button');
modalCloseButton.type = 'button';
modalCloseButton.textContent = 'Закрыть';

modalCloseButton.addEventListener('click', () => {
    victoryModal.close();
});

const victoryButtons = document.createElement('div');
victoryButtons.className = 'victory-buttons';
victoryButtons.append(modalNewGameButton, modalCloseButton);
victoryModal.append(victoryImage, victoryResult, victoryButtons);
document.body.append(victoryModal);


main.append(counters, gameBoard);
document.body.append(header, main);
newGameButton.addEventListener('click', startNewGame);
startNewGame();
