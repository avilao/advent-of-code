import { readFile } from '../utils/filesystem';
import { calculatePositionAndDepth, calculatePositionAndDepthV2 } from './02';

const input = readFile('02.input', import.meta.url);

describe('2021 02', () => {
  it('A', () => {
    expect(calculatePositionAndDepth(input)).toBe(1488669);
  });

  it('B', () => {
    expect(calculatePositionAndDepthV2(input)).toBe(1176514794);
  });
});
