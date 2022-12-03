import { readFile } from '../utils/filesystem';
import {
  getDifferentPasswordCount,
  getDifferentPasswordStrictCount,
} from './04';

const input = readFile('04.input', import.meta.url);

describe('2019 04', () => {
  it('Part One', () => {
    expect(getDifferentPasswordCount(input)).toBe(1660);
  });

  it('Part Two', () => {
    expect(getDifferentPasswordStrictCount(input)).toBe(1135);
  });
});
