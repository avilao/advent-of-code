const utils = require('../utils');
const IntCode = require('../intcode');

utils.rl.on("line",  function(line) {
  let m = {};
  let program = {};
  line.split(",").map(v => parseInt(v)).forEach((value, i) => {
    program[i] = value;
  })

  program[0] = 2;
  const cpu = new IntCode(program);
  cpu.input = 0;

  let ball, disk;
  let score = 0;
  while (!cpu.halted) { 
    cpu.input = (disk === undefined || ball === undefined || disk === ball ? 0 : (ball > disk ? 1 : -1));
    cpu.doOp();

    if(cpu.output.length == 3) {
      const [x, y, v]  = cpu.output;
      if (x === -1 && y === 0) {
        score = v;
      } else {
        if (v === 3) disk = x;
        if (v === 4) ball = x;
      }
      cpu.output = [];
    }
  }   
  console.log(score);
});
