import { readFile } from '../utils/filesystem';
import { maxCalories } from './01';

const input = readFile('01.txt', import.meta.url);

describe('2022 01', () => {
  it('A', () => {
    expect(maxCalories(input)).toBe(70116);
  });

  it('B', () => {
    expect(maxCalories(input, 3)).toBe(206582);
  });
});
