import { readFile } from '../utils/filesystem';
import { calculatePositionAndDepth, calculatePositionAndDepthV2 } from './02';

const input = readFile('02.input', import.meta.url);

describe('2021 02', () => {
  it('Part One', () => {
    expect(calculatePositionAndDepth(input)).toBe(1488669);
  });

  it('Part Two', () => {
    expect(calculatePositionAndDepthV2(input)).toBe(1176514794);
  });
});
