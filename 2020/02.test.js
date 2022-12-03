import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './02';

const input = readFile('02.input', import.meta.url);

describe('2020 02', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(645);
  });

  it('Part Two', () => {
    expect(solve2(input)).toBe(737);
  });
});
