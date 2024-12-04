import { readFile } from '../utils/filesystem';
import { solve, solveTwo } from './04';

const input = readFile('04.input', import.meta.url);

describe('2024 04', () => {
  it('Part One', () => {
    expect(solve(input, 'XMAS')).toBe(2378); // 18
  });

  it('Part Two', () => {
    expect(solveTwo(input, 'MAS')).toBe(1796); // 9
  });
});
