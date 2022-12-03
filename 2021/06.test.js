import { readFile } from '../utils/filesystem';
import { getNumberOfFish, getNumberOfImortalFish } from './06';

const input = readFile('06.input', import.meta.url);

describe('2021 06', () => {
  it('Part One', () => {
    expect(getNumberOfFish(input, 80)).toBe(353079);
  });

  it('Part Two', () => {
    expect(getNumberOfImortalFish(input, 256)).toBe(1605400130036);
  });
});
