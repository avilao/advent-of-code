import { readFile } from '../utils/filesystem';
import { solve } from './05';

const input = readFile('05.input', import.meta.url);

describe('2024 05', () => {
  it('Part One', () => {
    expect(solve(input)[0]).toBe(4578); // 143
  });

  it('Part Two', () => {
    expect(solve(input)[1]).toBe(6179); // 123
  });
});
