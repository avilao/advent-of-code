import { readFile } from '../utils/filesystem';
import {
  getFullNumberOfOverlappingPoints,
  getNumberOfOverlappingPoints,
} from './05';

const input = readFile('05.input', import.meta.url);

describe('2021 05', () => {
  it('Part One', () => {
    expect(getNumberOfOverlappingPoints(input)).toBe(7380);
  });

  it('Part Two', () => {
    expect(getFullNumberOfOverlappingPoints(input)).toBe(21373);
  });
});
