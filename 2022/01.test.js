import { readFile } from '../utils/filesystem';
import { maxCalories } from './01';

const input = readFile('01.input', import.meta.url);

describe('2022 01', () => {
  it('Part One', () => {
    expect(maxCalories(input)).toBe(70116);
  });

  it('Part Two', () => {
    expect(maxCalories(input, 3)).toBe(206582);
  });
});
