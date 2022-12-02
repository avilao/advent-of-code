import { IntCode } from './intcode';

const DIRECTIONS_VECTOR = [
  [0, 1], // UP
  [1, 0], // RIGHT
  [0, -1], // DOWN
  [-1, 0], // LEFT
];

export function solve(input) {
  let colorMap = {};
  let program = {};

  input
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
  return Object.keys(colorMap).length;
}

export function solve2(input) {
  let colorMap = {};
  let program = {};
  input
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

  let str = '\n';
  for (
    let y = sortedKeys[sortedKeys.length - 1][1];
    y >= sortedKeys[0][1];
    y--
  ) {
    for (
      let x = sortedKeys[0][0];
      x <= sortedKeys[sortedKeys.length - 1][0];
      x++
    ) {
      str += colorMap[[x, y]] === 1 ? '#' : ' ';
    }
    str += '\n';
  }
  return str;
}
