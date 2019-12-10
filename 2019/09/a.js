const utils = require('../utils');

class Amp {
   constructor(program) {
    this.halted = false;
    this.position = 0;
    this.output = [];
    this.offset = 0;
    this.program = program;
  }

  getValueFromOpcode(n, mode) {
    if(mode === 0) return this.program[this.program[n]] || 0;
    if(mode === 1) return this.program[n] || 0;
    return this.program[this.program[n] + this.offset] || 0;
  } 

  write(pos, v) {
    this.program[pos.toString()] = v;
  }

  doOp() {
    const instruction = this.program[this.position];
    const op = utils.getNumberAtPosition(instruction, 1) + utils.getNumberAtPosition(instruction, 2) * 10;
    const o1mode  = utils.getNumberAtPosition(instruction, 3);
    const o2mode  = utils.getNumberAtPosition(instruction, 4);

    const o1 = this.getValueFromOpcode(this.position + 1, o1mode);
    const o2 = this.getValueFromOpcode(this.position + 2, o2mode);

    switch (op) {
      case 1: 
        this.write(
          this.program[this.position + 3],
          this.getValueFromOpcode(this.position + 1, utils.getNumberAtPosition(instruction, 3))
          + this.getValueFromOpcode(this.position + 2, utils.getNumberAtPosition(instruction, 4))
        );
        this.position += 4;
        break;
      case 2:
        this.write(
         this.program[this.position + 3],
          this.getValueFromOpcode(this.position + 1, utils.getNumberAtPosition(instruction, 3))
          * this.getValueFromOpcode(this.position + 2, utils.getNumberAtPosition(instruction, 4))
        );
        this.position += 4;
        break;
      case 3:
        this.write(this.program[this.position + 1], this.input);
        this.position += 2;
        break;
      case 4:
        this.output.push(this.getValueFromOpcode(this.position + 1, o1mode))
        this.position += 2;
        break;
      case 5:
        this.position = o1 !== 0 ? o2 : this.position + 3;
        break;
      case 6: 
        this.position = o1 === 0 ? o2 : this.position + 3;
        break;
      case 7:
        this.write(this.program[this.position + 3], o1 < o2 ? 1 : 0);
        this.position += 4;
        break;
      case 8:
        this.write(this.program[this.position + 3], o1 === o2 ? 1 : 0);
        this.position += 4;
        break;
      case 9:
        this.offset += o1;
        this.position += 2;
        break;
      case 99:
        this.halted = true;
        break;
      default:
        break;
    }
  }
}

utils.rl.on("line",  function(line) {
  let program = {};
  line.split(",").map(v => parseInt(v)).forEach((value, i) => {
    program[i] = value;
  })

  const amp = new Amp(program);
  amp.input = 1;
  while (!amp.halted) amp.doOp();   
  console.log(amp.output);
});
