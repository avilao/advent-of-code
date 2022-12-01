import { readFile } from '../utils/filesystem';
import { solve } from './09';

const input = readFile('09.input', import.meta.url);

describe('2019 09', () => {
  it('A', () => {
    expect(solve(input)[0]).toBe(3518157894);
  });

  it('B', () => {
    expect(solve(input)[1]).toBe(80379);
  });
});
