const INSTRUCTIONS = {
  ADDX: 'addx',
  NOOP: 'noop',
};

const CYCLE_COUNT_START = 20;
const PIXELS_PER_COLUMN = 40;

export function solve(input) {
  const commands = input.split('\n');
  let pixels = '';
  let cycle = 0;
  let cycleCursor = 0;
  let nextCycleToCount = CYCLE_COUNT_START;
  let spritePosition = 1;
  let previousSpritePosition = 1;
  let signalStrength = 0;

  commands.forEach((command) => {
    const [inst, value] = command.split(' ');
    switch (inst) {
      case INSTRUCTIONS.NOOP: {
        cycle++;
        break;
      }

      case INSTRUCTIONS.ADDX: {
        spritePosition += parseInt(value, 10);
        cycle += 2;
      }
    }

    while (cycleCursor < cycle) {
      const moddedCycle = cycleCursor % PIXELS_PER_COLUMN;
      pixels +=
        moddedCycle < previousSpritePosition - 1 ||
        moddedCycle > previousSpritePosition + 1
          ? '.'
          : '#';

      cycleCursor++;
      if (cycleCursor % 40 === 0) pixels += '\n';
    }
    while (nextCycleToCount <= cycle) {
      signalStrength += nextCycleToCount * previousSpritePosition;
      nextCycleToCount += PIXELS_PER_COLUMN;
    }
    previousSpritePosition = spritePosition;
  });

  return [signalStrength, pixels];
}
