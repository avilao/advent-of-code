import { readFile } from '../utils/filesystem';
import { solve } from './04';

const input = readFile('04.input', import.meta.url);

describe('2020 04', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(250);
  });

  it('Part Two', () => {
    expect(solve(input, true)).toBe(158);
  });
});
