import { readFile } from '../utils/filesystem';
import { solve } from './10';

const input = readFile('10.input', import.meta.url);

describe('2022 10', () => {
  const results = solve(input);

  it('Part One', () => {
    expect(results[0]).toBe(15220);
  });

  it('Part Two', () => {
    expect(results[1]).toBe(`###..####.####.####.#..#.###..####..##..
#..#.#.......#.#....#.#..#..#.#....#..#.
#..#.###....#..###..##...###..###..#..#.
###..#.....#...#....#.#..#..#.#....####.
#.#..#....#....#....#.#..#..#.#....#..#.
#..#.#....####.####.#..#.###..#....#..#.
`);
  });
});
