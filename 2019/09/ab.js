const IntCode = require('../intcode');
const utils = require('../utils');

utils.rl.on('line', function (line) {
  let program = {};
  line
    .split(',')
    .map((v) => parseInt(v))
    .forEach((value, i) => {
      program[i] = value;
    });

  const part1 = new IntCode(program);
  part1.input = 1;
  while (!part1.halted) part1.doOp();
  console.log(part1.output);

  const part2 = new IntCode(program);
  part2.input = 2;
  while (!part2.halted) part2.doOp();
  console.log(part2.output);
});
