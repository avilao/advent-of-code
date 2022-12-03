import { readFile } from '../utils/filesystem';
import { solve, solveFor3 } from './01';

const input = readFile('01.input', import.meta.url);

describe('2020 01', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(866436);
  });

  it('Part Two', () => {
    expect(solveFor3(input)).toBe(276650720);
  });
});
