import { getNumberAtPosition, getPermutations } from '../utils/math';

class Amp {
  constructor(phase, program) {
    this.phase = phase;
    this.program = program;
    this.position = 0;
    this.initialized = false;
    this.output = 0;
    this.hasOutputed = false;
  }

  do1(o1, o2, o3) {
    this.program[o3] = o2 + o1;
    this.position += 4;
  }

  do2(o1, o2, o3) {
    this.program[o3] = o2 * o1;
    this.position += 4;
  }

  do3() {
    if (!this.initialized) {
      this.program[this.getValueFromOpcode(this.position + 1, 1)] = this.phase;
      this.initialized = true;
    } else {
      this.program[this.getValueFromOpcode(this.position + 1, 1)] = this.input;
    }
    this.position += 2;
  }

  do4(o1) {
    this.output = o1;
    this.position += 2;
  }

  do5(o1, o2) {
    this.position = o1 !== 0 ? o2 : this.position + 3;
  }

  do6(o1, o2) {
    this.position = o1 === 0 ? o2 : this.position + 3;
  }

  do7(o1, o2, o3) {
    this.program[o3] = o1 < o2 ? 1 : 0;
    this.position += 4;
  }

  do8(o1, o2, o3) {
    this.program[o3] = o1 === o2 ? 1 : 0;
    this.position += 4;
  }

  do99() {
    this.position = 9999999999;
  }

  getValueFromOpcode(n, mode) {
    return mode === 0 ? this.program[this.program[n]] : this.program[n];
  }

  isFinished() {
    return this.position > this.program.length;
  }

  getOperationParams() {
    const instruction = this.program[this.position];
    const o1mode = getNumberAtPosition(instruction, 3);
    const o2mode = getNumberAtPosition(instruction, 4);
    return {
      o1: this.getValueFromOpcode(this.position + 1, o1mode),
      o2: this.getValueFromOpcode(this.position + 2, o2mode),
      o3: this.getValueFromOpcode(this.position + 3, 1),
      op:
        getNumberAtPosition(instruction, 1) +
        getNumberAtPosition(instruction, 2) * 10,
    };
  }

  doOp() {
    const { op, o1, o2, o3 } = this.getOperationParams();

    this[`do${op}`](o1, o2, o3);
  }
}

class Amp2 extends Amp {
  do3() {
    if (this.phase) {
      this.program[this.getValueFromOpcode(this.position + 1, 1)] = this.phase;
      this.phase = undefined;
    } else {
      this.program[this.getValueFromOpcode(this.position + 1, 1)] = this.input;
      this.input = undefined;
    }
    this.position += 2;
  }

  do4(o1) {
    this.output = o1;
    this.position += 2;
    this.hasOutputed = true;
  }
}

export function solve(input) {
  const program = input.split(',').map((v) => parseInt(v));
  const key = [0, 1, 2, 3, 4];
  const permutations = getPermutations(key);
  let maxOutput = 0;

  permutations.forEach((perm) => {
    const amps = perm.map((phase) => new Amp(phase, program.slice()));

    amps.forEach(async (amp, index) => {
      amp.input = amps[(index + key.length - 1) % key.length].output;
      while (!amp.isFinished()) amp.doOp();
    });

    if (amps[key.length - 1].output > maxOutput)
      maxOutput = amps[key.length - 1].output;
  });
  return maxOutput;
}

export function solve2(input) {
  const program = input.split(',').map((v) => parseInt(v));
  const key = [5, 6, 7, 8, 9];
  const permutations = getPermutations(key);
  let maxOutput = 0;

  permutations.forEach((perm) => {
    const amps = perm.map((phase) => new Amp2(phase, program.slice()));
    amps[0].input = 0;
    for (
      let i = 0;
      !amps[key.length - 1].isFinished();
      i = (i + 1) % key.length
    ) {
      while (!amps[i].isFinished() && !amps[i].hasOutputed) amps[i].doOp();
      amps[(i + 1) % key.length].input = amps[i].output;
      amps[i].hasOutputed = false;
    }

    if (amps[key.length - 1].output > maxOutput)
      maxOutput = amps[key.length - 1].output;
  });
  return maxOutput;
}
