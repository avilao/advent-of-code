import { readFile } from '../utils/filesystem';
import { getFuelSpent } from './07';

const input = readFile('07.input', import.meta.url);

describe('2021 07', () => {
  it('A', () => {
    expect(getFuelSpent(input)).toBe(343605);
  });

  it('B', () => {
    expect(getFuelSpent(input, true)).toBe(96744904);
  });
});
