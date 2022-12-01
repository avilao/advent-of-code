const IntCode = require('../intcode');
const utils = require('../utils');

const DIRECTIONS_VECTOR = [
  [0, 1], // UP
  [1, 0], // RIGHT
  [0, -1], // DOWN
  [-1, 0], // LEFT
];

utils.rl.on('line', function (line) {
  let colorMap = {};
  let program = {};
  line
    .split(',')
    .map((v) => parseInt(v))
    .forEach((value, i) => {
      program[i] = value;
    });

  const currentPosition = [0, 0];
  let directionIndex = 0;

  const robot = new IntCode(program);
  robot.input = 1;
  while (!robot.halted) {
    robot.doOp();
    if (robot.output.length == 2) {
      const newColor = robot.output.shift();
      const rotateDirection = robot.output.shift() === 0 ? -1 : 1;

      colorMap[currentPosition] = newColor;
      directionIndex = (4 + directionIndex + rotateDirection) % 4;
      currentPosition[0] =
        currentPosition[0] + DIRECTIONS_VECTOR[directionIndex][0];
      currentPosition[1] =
        currentPosition[1] + DIRECTIONS_VECTOR[directionIndex][1];
      robot.output = [];
    }
    robot.input = colorMap[currentPosition] || 0;
  }

  const sortedKeys = Object.keys(colorMap)
    .map((k) => k.split(',').map((v) => parseInt(v)))
    .sort((a, b) => {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return a[0] < b[0];
    });

  for (
    let y = sortedKeys[sortedKeys.length - 1][1];
    y >= sortedKeys[0][1];
    y--
  ) {
    let line = '';
    for (
      let x = sortedKeys[0][0];
      x <= sortedKeys[sortedKeys.length - 1][0];
      x++
    ) {
      line += colorMap[[x, y]] === 1 ? '#' : ' ';
    }
    console.log(line);
  }
});
