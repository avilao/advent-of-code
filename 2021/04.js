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

function prepareBoard(input) {
  const bingo = input.split('\n');
  const numberList = bingo
    .shift()
    .split(',')
    .map((x) => parseInt(x));
  bingo.shift(); // remove empty line

  const boards = [];
  let i = 0;
  let currentBoard = -1;

  // read boards
  let line;
  while ((line = bingo.shift()) !== undefined) {
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

  return { boards, numberList };
}

export function getFileScore(input) {
  const { boards, numberList } = prepareBoard(input);

  for (const number of numberList) {
    for (const board of boards) {
      markBoard(board, number);

      if (checkWinnerBoard(board)) {
        return getBoardValue(board, number);
      }
    }
  }
}

export function getLastBoardFinalScore(input) {
  const { boards, numberList } = prepareBoard(input);

  for (const number of numberList) {
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      markBoard(board, number);

      if (checkWinnerBoard(board)) {
        if (boards.length > 1) {
          boards.splice(b, 1);
          b--;
        } else {
          return getBoardValue(board, number);
        }
      }
    }
  }
}
