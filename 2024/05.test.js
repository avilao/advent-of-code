import { readFile } from '../utils/filesystem';
import { solve } from './05';

const input = readFile('05.input', import.meta.url);

describe('2024 05', () => {
  it('Part One', () => {
    expect(solve(input, 'XMAS')).toBe(143); // 143 4578
  });

  // it('Part Two', () => {
  //   expect(solve(input, 'MAS')).toBe(1796); // 9
  // });
});
