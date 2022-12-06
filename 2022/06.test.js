import { readFile } from '../utils/filesystem';
import { solve } from './06';

const input = readFile('06.input', import.meta.url);

describe('2022 06', () => {
  it('Part One', () => {
    expect(solve(input, 4)).toBe(1582);
  });

  it('Part Two', () => {
    expect(solve(input, 14)).toBe(3588);
  });
});
