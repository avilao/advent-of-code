import { readFile } from '../utils/filesystem';
import { solve } from './05';

const input = readFile('05.input', import.meta.url);

describe('2022 05', () => {
  it('Part One', () => {
    expect(solve(input)).toBe('LJSVLTWQM');
  });

  it('Part Two', () => {
    expect(solve(input, true)).toBe('BRQWDBBJM');
  });
});
