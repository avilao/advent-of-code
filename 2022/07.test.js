import { readFile } from '../utils/filesystem';
import { solve } from './07';

const input = readFile('07.input', import.meta.url);

describe('2022 07', () => {
  it('Part One and Two', () => {
    expect(solve(input)).toEqual({ part1: 1297683, part2: 5756764 });
  });
});
