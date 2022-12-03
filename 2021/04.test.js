import { readFile } from '../utils/filesystem';
import { getFileScore, getLastBoardFinalScore } from './04';

const input = readFile('04.input', import.meta.url);

describe('2021 04', () => {
  it('Part One', () => {
    expect(getFileScore(input)).toBe(14093);
  });

  it('Part Two', () => {
    expect(getLastBoardFinalScore(input)).toBe(17388);
  });
});
