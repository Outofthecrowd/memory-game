
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

const movesCounter = document.createElement('p');
movesCounter.textContent = 'Ходы: 0';

const pairsCounter = document.createElement('p');
pairsCounter.textContent = 'Найдено пар: 0';

const counters = document.createElement('div');
counters.className = 'counters';
counters.append(movesCounter, pairsCounter);

const gameBoard = document.createElement('div');
gameBoard.className = 'game-board';


const cards = [];
for (let i = 0; i < 16; i += 1) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'card';
  card.dataset.state = 'closed';
  card.textContent = 'X';

  cards.push(card);''
  gameBoard.append(card);
}


main.append(counters, gameBoard);

document.body.append(header, main);