import { readFile } from '../utils/filesystem';
import { solve } from './03';

const input = readFile('03.input', import.meta.url);

describe('2020 03', () => {
  it('Part One', () => {
    expect(solve(input, 1)).toBe(156);
  });

  it('Part Two', () => {
    expect(solve(input)).toBe(3521829480);
  });
});
