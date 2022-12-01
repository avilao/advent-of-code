import { readFile } from '../utils/filesystem';
import { getFileScore, getLastBoardFinalScore } from './04';

const input = readFile('04.input', import.meta.url);

describe('2021 04', () => {
  it('A', () => {
    expect(getFileScore(input)).toBe(14093);
  });

  it('B', () => {
    expect(getLastBoardFinalScore(input)).toBe(17388);
  });
});
