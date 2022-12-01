import { readFile } from '../utils/filesystem';
import { getTotalFuel } from './01';

const input = readFile('01.input', import.meta.url);

describe('2019 01', () => {
  it('A', () => {
    expect(getTotalFuel(input)).toBe(3397667);
  });

  it('B', () => {
    expect(getTotalFuel(input, true)).toBe(5093620);
  });
});
