import { readFile } from '../utils/filesystem';
import { getFuelSpent } from './07';

const input = readFile('07.input', import.meta.url);

describe('2021 07', () => {
  it('Part One', () => {
    expect(getFuelSpent(input)).toBe(343605);
  });

  it('Part Two', () => {
    expect(getFuelSpent(input, true)).toBe(96744904);
  });
});
