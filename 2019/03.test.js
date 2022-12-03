import { readFile } from '../utils/filesystem';
import { getDistance, getFewestCombinedSteps } from './03';

const input = readFile('03.input', import.meta.url);

describe('2019 03', () => {
  it('Part One', () => {
    expect(getDistance(input)).toBe(232);
  });

  it('Part Two', () => {
    expect(getFewestCombinedSteps(input, true)).toBe(6084);
  });
});
