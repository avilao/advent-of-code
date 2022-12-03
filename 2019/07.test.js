import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './07';

const input = readFile('07.input', import.meta.url);

describe('2019 07', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(79723);
  });

  it('Part Two', () => {
    expect(solve2(input)).toBe(70602018);
  });
});
