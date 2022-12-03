import { readFile } from '../utils/filesystem';
import { solve } from './12';

const input = readFile('12.input', import.meta.url);

describe('2019 12', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(7988);
  });

  it('Part Two', () => {
    expect(true).toBe(false);
  });
});
