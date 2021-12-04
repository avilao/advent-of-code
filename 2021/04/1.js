const utils = require('../utils');

const BOARD_SIZE = 5;

function markBoard(board, number) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === number) {
        board[i][j] = -1;
      }
    }
  }
}

function checkWinnerBoard(board) {
  const rowSums = new Array(BOARD_SIZE).fill(0);
  const colSums = new Array(BOARD_SIZE).fill(0);

  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      rowSums[y] += board[y][x];
      if (rowSums[y] === -5) return true;
      colSums[x] += board[y][x];
      if (colSums[x] === -5) return true;
    }
  }
  return false;
}

function getBoardValue(board, number) {
  let sum = 0;
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      sum += board[y][x] > 0 ? board[y][x] : 0;
    }
  }
  return sum * number;
}

async function main() {
  const numberList = (await utils.getLine()).split(',').map((x) => parseInt(x));
  await utils.getLine();

  const boards = [];
  let i = 0;
  currentBoard = -1;

  // read boards
  while (true) {
    const line = await utils.getLine();
    if (line === undefined) break;
    if (line === '') continue;

    // new board
    if (i % BOARD_SIZE === 0) {
      boards.push([]);
      currentBoard++;
    }

    boards[currentBoard].push(
      line
        .trim()
        .split(/\s+/)
        .map((x) => parseInt(x))
    );

    i++;
  }

  for (const number of numberList) {
    for (const board of boards) {
      markBoard(board, number);

      if (checkWinnerBoard(board)) {
        console.log(getBoardValue(board, number));
        return;
      }
    }
  }
}

main();
