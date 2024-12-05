import { readFile } from '../utils/filesystem';
import { solve, solveTwo } from './05';

const input = readFile('05.input', import.meta.url);

describe('2024 05', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(4578); // 143
  });

  it('Part Two', () => {
    expect(solveTwo(input)).toBe(6179); // 123
  });
});
