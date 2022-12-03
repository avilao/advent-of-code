import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './13';

const input = readFile('13.input', import.meta.url);

describe('2019 13', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(427);
  });

  it('Part Two', () => {
    expect(solve2(input)).toBe(21426);
  });
});
