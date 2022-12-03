import { readFile } from '../utils/filesystem';
import {
  getCoordinateOfNthVaporizedAsteroid,
  getMaxAsteroidsDetected,
} from './10';

const input = readFile('10.input', import.meta.url);

describe('2019 10', () => {
  it('Part One', () => {
    expect(getMaxAsteroidsDetected(input)).toBe(260);
  });

  it('Part Two', () => {
    expect(getCoordinateOfNthVaporizedAsteroid(input, 200)).toBe(608);
  });
});
