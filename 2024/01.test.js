import { readFile } from '../utils/filesystem';
import { solveOne, solveTwo } from './01';

const input = readFile('01.input', import.meta.url);

describe('2022 01', () => {
  it('Part One', () => {
    expect(solveOne(input)).toBe(2367773);
  });

  it('Part Two', () => {
    expect(solveTwo(input)).toBe(21271939);
  });
});
