export function solve(input, shouldKeepOrder = false) {
  const [startStateLines, movesLines] = input
    .split('\n\n')
    .map((l) => l.split('\n'));

  const startState = startStateLines.slice(0, -1); // remove stack labels
  const crateCount = (startState[0].length + 1) / 4;
  const stacks = Array.from(Array(crateCount), () => []);

  // transverse in reverse order for easier crate insertion
  for (let i = startState.length - 1; i >= 0; i--) {
    for (let c = 0; c < startState[i].length; c += 4) {
      const crateId = startState[i][c + 1];
      if (crateId !== ' ') stacks[c / 4].push(crateId);
    }
  }

  // parse moves input to get only 3 needed numbers
  const moves = movesLines.map((move) =>
    move
      .split(' ')
      .filter((_, i) => i % 2 === 1)
      .map((v) => parseInt(v, 10))
  );

  moves.forEach((move) => {
    const [numberOfMoves, stackIndexStart, stackIndexEnd] = move;
    const movedCrates = [];
    for (let i = 0; i < numberOfMoves; i++) {
      movedCrates.push(stacks[stackIndexStart - 1].pop());
    }
    if (shouldKeepOrder) movedCrates.reverse();
    stacks[stackIndexEnd - 1].push(...movedCrates);
  });

  // build top crate result
  return stacks.reduce((acc, stack) => {
    if (stack.length > 0) {
      acc += stack[stack.length - 1];
    }
    return acc;
  }, '');
}
