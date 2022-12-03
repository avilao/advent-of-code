import { readFile } from '../utils/filesystem';
import { getLifeSupportRating, powerConsumption } from './03';

const input = readFile('03.input', import.meta.url);

describe('2021 03', () => {
  it('Part One', () => {
    expect(powerConsumption(input)).toBe(1092896);
  });

  it('Part Two', () => {
    expect(getLifeSupportRating(input)).toBe(4672151);
  });
});
