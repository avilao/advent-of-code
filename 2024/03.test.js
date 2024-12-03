import { readFile } from '../utils/filesystem';
import { solveOne } from './03';

const input = readFile('03.input', import.meta.url);

describe('2024 03', () => {
  it('Part One', () => {
    expect(solveOne(input)).toBe(189600467);
  });

  it('Part Two', () => {
    expect(solveOne(input, true)).toBe(107069718);
  });
});
