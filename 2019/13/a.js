const IntCode = require('../intcode');
const utils = require('../utils');

utils.rl.on('line', function (line) {
  let m = {};
  let program = {};
  line
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
  console.log(
    Object.keys(m).reduce((acc, key) => acc + (m[key] === 2 ? 1 : 0), 0)
  );
});
