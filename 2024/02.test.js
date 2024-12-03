import { readFile } from '../utils/filesystem';
import { solveOne } from './02';

const input = readFile('02.input', import.meta.url);

describe('2024 02', () => {
  it('Part One', () => {
    expect(solveOne(input)).toBe(559);
  });

  it('Part Two', () => {
    expect(solveOne(input, true)).toBe(601);
  });
});
