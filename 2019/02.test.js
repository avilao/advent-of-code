import { readFile } from '../utils/filesystem';
import { getNounAndVerbValue, getValueLeft } from './02';

const input = readFile('02.input', import.meta.url);

describe('2019 02', () => {
  it('Part One', () => {
    expect(getValueLeft(input)).toBe(3085697);
  });

  it('Part Two', () => {
    expect(getNounAndVerbValue(input, true)).toBe(9425);
  });
});
