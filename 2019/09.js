import { IntCode } from './intcode';

export function solve(input) {
  let program = {};
  input
    .split(',')
    .map((v) => parseInt(v))
    .forEach((value, i) => {
      program[i] = value;
    });

  const part1 = new IntCode(program);
  part1.input = 1;
  while (!part1.halted) part1.doOp();

  const part2 = new IntCode(program);
  part2.input = 2;
  while (!part2.halted) part2.doOp();

  return [part1.output[0], part2.output[0]];
}
