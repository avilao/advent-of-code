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
  while (!robot.halted) {
    robot.input = colorMap[currentPosition] || 0;
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
  }
  console.log(Object.keys(colorMap).length);
});
