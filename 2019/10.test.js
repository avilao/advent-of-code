import { readFile } from '../utils/filesystem';
import {
  getCoordinateOfNthVaporizedAsteroid,
  getMaxAsteroidsDetected,
} from './10';

const input = readFile('10.input', import.meta.url);

describe('2019 10', () => {
  it('A', () => {
    expect(getMaxAsteroidsDetected(input)).toBe(260);
  });

  it('B', () => {
    expect(getCoordinateOfNthVaporizedAsteroid(input, 200)).toBe(608);
  });
});
