import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './05';

const input = readFile('05.input', import.meta.url);

describe('2019 05', () => {
  it('A', () => {
    expect(solve(input)).toBe(13346482);
  });

  it('B', () => {
    expect(solve2(input)).toBe(12111395);
  });
});
