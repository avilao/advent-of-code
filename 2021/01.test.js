import { readFile } from '../utils/filesystem';
import { measurementIncreases, measurementSlidingIncreases } from './01';

const input = readFile('01.input', import.meta.url);

describe('2021 01', () => {
  it('A', () => {
    expect(measurementIncreases(input)).toBe(1692);
  });

  it('B', () => {
    expect(measurementSlidingIncreases(input)).toBe(1724);
  });
});
