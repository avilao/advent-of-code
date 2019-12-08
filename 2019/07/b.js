var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


function getPerm(ar) {
  const results = [];

  if (ar.length === 1) {
    results.push(ar);
    return results;
  }

  for (let i = 0; i < ar.length; i++) {
    const el = ar[i];
    const elsLeft = ar.slice(0, i).concat(ar.slice(i + 1));
    var innerPerms = getPerm(elsLeft);
    for (var j = 0; j < innerPerms.length; j++) {
      results.push([el].concat(innerPerms[j]));
    }
  }
  return results;
}

const getNumberAt = (number, pos) =>  Math.floor((number / Math.pow(10, pos - 1)) % 10);

class Amp {
   constructor(phase, program) {
    this.phase = phase;
    this.program = program;
    this.position = 0;
    this.output = 0;
  }

  isFinished = () => (this.position >= this.program.length);
  isWaitingInput = () => this.input === undefined && (getNumberAt(this.program[this.position], 1) === 2);

  getValueFromOpcode = (n, mode) => (mode === 0 ? this.program[this.program[n]] : this.program[n]);

  doOp() {
    const instruction = this.program[this.position];
    const op = getNumberAt(instruction, 1) + getNumberAt(instruction, 2) * 10;
    const o1mode  = getNumberAt(instruction, 3);
    const o2mode  = getNumberAt(instruction, 4);
    const o1 = this.getValueFromOpcode(this.position + 1, o1mode);
    const o2 = this.getValueFromOpcode(this.position + 2, o2mode);
    const o3 = this.getValueFromOpcode(this.position + 3, 1);
    
    switch (op) {
      case 1:
        this.program[o3] = o2 + o1;
        this.position += 4;
        break;
      case 2: 
        this.program[o3] = o2 * o1;
        this.position += 4;
        break;
      case 3:
        if (this.phase) {
          this.program[this.getValueFromOpcode(this.position + 1, 1)] = this.phase;
          this.phase = undefined;
        } else {
          this.program[this.getValueFromOpcode(this.position + 1, 1)] = this.input;
          this.input = undefined;
        }
        this.position += 2;
        break;
      case 4:
        this.output = o1;
        this.position += 2;
        break;
      case 5:
        this.position = o1 !== 0 ? o2 : this.position + 3;
        break;
      case 6: 
        this.position = o1 === 0 ? o2 : this.position + 3;
        break;
      case 7:
        this.program[o3] =  o1 < o2 ? 1 : 0;
        this.position += 4;
        break;
      case 8:
        this.program[o3] = (o1 === o2 ? 1 : 0);
        this.position += 4;
        break;
      case 99:
        this.position = 9999999999;
      default:
        break;
    }
  }
}

rl.on("line",  function(line) {
  let maxOutput = 0;
  const program = line.split(",").map(v => parseInt(v));
  // const permutations = getPerm([, 6, 7, 8, 9]);
  const permutations = [[9, 8, 7, 6, 5]];

  permutations.forEach((perm) => {
    const amps = perm.map((phase) => new Amp(phase,  program.slice()));

    for(let i = 0; !amps[4].isFinished(); i = (i + 1) % 5) {
      amps[i].input = amps[(i + 4) % 5].output;
      console.log(amps[i].input);
      while (!amps[i].isFinished() && !amps[i].isWaitingInput()) amps[i].doOp();

    }

    if (amps[4].output > maxOutput) maxOutput = amps[4].output;
    // console.log(amps);
  });
  console.log(maxOutput)
});
