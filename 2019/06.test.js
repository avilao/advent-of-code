import { readFile } from '../utils/filesystem';
import { countOrbits, getMinOrbitalTransfers } from './06';

const input = readFile('06.input', import.meta.url);

describe('2019 06', () => {
  it('A', () => {
    expect(countOrbits(input)).toBe(251208);
  });

  it('B', () => {
    expect(getMinOrbitalTransfers(input)).toBe(397);
  });
});
