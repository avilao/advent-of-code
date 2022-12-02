import { IntCode } from './intcode';

export function solve(input) {
  let m = {};
  let program = {};
  input
    .split(',')
    .map((v) => parseInt(v))
    .forEach((value, i) => {
      program[i] = value;
    });

  const cpu = new IntCode(program);
  while (!cpu.halted) {
    cpu.doOp();

    if (cpu.output.length == 3) {
      const [x, y, id] = cpu.output;
      m[[x, y]] = id;
      cpu.output = [];
    }
  }
  return Object.keys(m).reduce((acc, key) => acc + (m[key] === 2 ? 1 : 0), 0);
}

export function solve2(input) {
  let program = {};
  input
    .split(',')
    .map((v) => parseInt(v))
    .forEach((value, i) => {
      program[i] = value;
    });

  program[0] = 2;
  const cpu = new IntCode(program);
  cpu.input = 0;

  let ball, disk;
  let score = 0;
  while (!cpu.halted) {
    cpu.input =
      disk === undefined || ball === undefined || disk === ball
        ? 0
        : ball > disk
        ? 1
        : -1;
    cpu.doOp();

    if (cpu.output.length == 3) {
      const [x, y, v] = cpu.output;
      if (x === -1 && y === 0) {
        score = v;
      } else {
        if (v === 3) disk = x;
        if (v === 4) ball = x;
      }
      cpu.output = [];
    }
  }
  return score;
}
