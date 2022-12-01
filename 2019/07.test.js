import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './07';

const input = readFile('07.input', import.meta.url);

describe('2019 07', () => {
  it('A', () => {
    expect(solve(input)).toBe(79723);
  });

  it('B', () => {
    expect(solve2(input)).toBe(70602018);
  });
});
