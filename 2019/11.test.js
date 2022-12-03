import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './11';

const input = readFile('11.input', import.meta.url);

describe('2019 11', () => {
  it('Part One', () => {
    expect(solve(input)).toBe(2252);
  });

  it('Part Two', () => {
    expect(solve2(input)).toBe(`
 ##   ##   ##  #    ###   ##    ## ####  
#  # #  # #  # #    #  # #  #    # #     
#  # #    #  # #    #  # #       # ###   
#### # ## #### #    ###  # ##    # #     
#  # #  # #  # #    # #  #  # #  # #     
#  #  ### #  # #### #  #  ###  ##  ####  
`);
  });
});
