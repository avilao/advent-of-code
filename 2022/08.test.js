import { readFile } from '../utils/filesystem';
import { getVisibleTreesFromBestTree, getVisibleTreesFromOutside } from './08';

const input = readFile('08.input', import.meta.url);

describe('2022 08', () => {
  it('Part One', () => {
    expect(getVisibleTreesFromOutside(input)).toBe(1711);
  });

  it('Part Two', () => {
    expect(getVisibleTreesFromBestTree(input)).toBe(301392);
  });
});
