import { readFile } from '../utils/filesystem';
import { getScoreByLine, getScoreByLineGroup } from './03';

const input = readFile('03.input', import.meta.url);

describe('2022 03', () => {
  it('Part One', () => {
    expect(getScoreByLine(input)).toBe(8202);
  });

  it('Part Two', () => {
    expect(getScoreByLineGroup(input)).toBe(2864);
  });
});
