import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './13';

const input = readFile('13.input', import.meta.url);

describe('2019 13', () => {
  it('A', () => {
    expect(solve(input)).toBe(427);
  });

  it('B', () => {
    expect(solve2(input)).toBe(21426);
  });
});
