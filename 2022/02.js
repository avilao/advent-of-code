const HAND_SCORE = {
  X: 1,
  Y: 2,
  Z: 3,
};

const PLAY_SCORE = {
  'A,X': 3,
  'A,Y': 6,
  'A,Z': 0,
  'B,X': 0,
  'B,Y': 3,
  'B,Z': 6,
  'C,X': 6,
  'C,Y': 0,
  'C,Z': 3,
};

const CONVERSION_TO_PLAY_SCORE = {
  'A,X': 'Z',
  'A,Y': 'X',
  'A,Z': 'Y',
  'B,X': 'X',
  'B,Y': 'Y',
  'B,Z': 'Z',
  'C,X': 'Y',
  'C,Y': 'Z',
  'C,Z': 'X',
};

export function getScore(input, needsConvertion = false) {
  const rounds = input.split('\n');
  let score = 0;
  rounds.forEach((round) => {
    const plays = round.split(' ');
    if (needsConvertion) {
      plays[1] = CONVERSION_TO_PLAY_SCORE[plays];
    }
    score += HAND_SCORE[plays[1]] + PLAY_SCORE[plays];
  });
  return score;
}
