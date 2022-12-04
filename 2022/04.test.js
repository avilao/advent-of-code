import { readFile } from '../utils/filesystem';
import { geWorkIntersectionCount, getFullWorkIntersectionCount } from './04';

const input = readFile('04.input', import.meta.url);

describe('2022 04', () => {
  it('Part One', () => {
    expect(getFullWorkIntersectionCount(input)).toBe(453);
  });

  it('Part Two', () => {
    expect(geWorkIntersectionCount(input)).toBe(919);
  });
});
