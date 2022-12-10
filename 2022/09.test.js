import { readFile } from '../utils/filesystem';
import { solve } from './09';

const input = readFile('09.input', import.meta.url);

describe('2022 09', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(6284);
  });

  it('Part Two', () => {
    expect(solve(input, 10)).toBe(2661);
  });
});
