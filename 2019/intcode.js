import { getNumberAtPosition } from '../utils/math';

export class IntCode {
  constructor(program) {
    this.halted = false;
    this.position = 0;
    this.output = [];
    this.offset = 0;
    this.program = program;
  }

  getReadValueFromParam(param) {
    if (param.mode === 0) return this.program[param.value] || 0;
    if (param.mode === 1) return param.value || 0;
    return this.program[param.value + this.offset] || 0;
  }

  write(param, v) {
    const p = param.value + (param.mode === 2 ? this.offset : 0);
    this.program[p.toString()] = v;
  }

  decodeInstruction() {
    const code = this.program[this.position];
    return {
      code,
      operator:
        getNumberAtPosition(code, 1) + getNumberAtPosition(code, 2) * 10,
      params: [
        {
          mode: getNumberAtPosition(code, 3),
          value: this.program[this.position + 1],
        },
        {
          mode: getNumberAtPosition(code, 4),
          value: this.program[this.position + 2],
        },
        {
          mode: getNumberAtPosition(code, 5),
          value: this.program[this.position + 3],
        },
      ],
    };
  }

  doOp() {
    const instruction = this.decodeInstruction();

    switch (instruction.operator) {
      case 1:
        this.write(
          instruction.params[2],
          this.getReadValueFromParam(instruction.params[0]) +
            this.getReadValueFromParam(instruction.params[1])
        );
        this.position += 4;
        break;
      case 2:
        this.write(
          instruction.params[2],
          this.getReadValueFromParam(instruction.params[0]) *
            this.getReadValueFromParam(instruction.params[1])
        );
        this.position += 4;
        break;
      case 3:
        this.write(instruction.params[0], this.input);
        this.position += 2;
        break;
      case 4:
        this.output.push(this.getReadValueFromParam(instruction.params[0]));
        this.position += 2;
        break;
      case 5:
        this.position =
          this.getReadValueFromParam(instruction.params[0]) !== 0
            ? this.getReadValueFromParam(instruction.params[1])
            : this.position + 3;
        break;
      case 6:
        this.position =
          this.getReadValueFromParam(instruction.params[0]) === 0
            ? this.getReadValueFromParam(instruction.params[1])
            : this.position + 3;
        break;
      case 7:
        this.write(
          instruction.params[2],
          this.getReadValueFromParam(instruction.params[0]) <
            this.getReadValueFromParam(instruction.params[1])
            ? 1
            : 0
        );
        this.position += 4;
        break;
      case 8:
        this.write(
          instruction.params[2],
          this.getReadValueFromParam(instruction.params[0]) ===
            this.getReadValueFromParam(instruction.params[1])
            ? 1
            : 0
        );
        this.position += 4;
        break;
      case 9:
        this.offset += this.getReadValueFromParam(instruction.params[0]);
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
