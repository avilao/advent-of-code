import { readFile } from '../utils/filesystem';
import { getScore } from './02';

const input = readFile('02.input', import.meta.url);

describe('2022 02', () => {
  it('Part One', () => {
    expect(getScore(input)).toBe(14163);
  });

  it('Part Two', () => {
    expect(getScore(input, true)).toBe(12091);
  });
});
