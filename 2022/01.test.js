import { readFile } from '../utils/filesystem';
import { maxCalories } from './01';

const input = readFile('01.txt', import.meta.url);

test('Day 01 - A', () => {
  expect(maxCalories(input)).toBe(70116);
});

test('Day 01 - B', () => {
  expect(maxCalories(input, 3)).toBe(206582);
});
